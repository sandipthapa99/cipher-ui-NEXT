import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
import { faTag } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, LoadingOverlay } from "@mantine/core";
import { MIME_TYPES } from "@mantine/dropzone";
import { CalendarTodayOutlined } from "@mui/icons-material";
import { QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useBookNowTask } from "hooks/task/use-book--now-task";
import { useUploadFile } from "hooks/use-upload-file";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { BookNowModalCardProps } from "types/bookNow";
import { bookServiceSchema } from "utils/formValidation/bookServiceFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

import { db } from "../../firebase/firebase";
import { CustomDropZone } from "./CustomDropZone";
import MantineDateField from "./MantineDateField";
import MantineTimeField from "./MantineTimeField";

// const useBookNowService = () =>
//     useMutation<string, AxiosError, any>((payload) =>
//         axiosClient
//             .post<{ message: string }>("/task/service/booking/", payload)
//             .then((res) => res.data.message)
//     );

const BookNowModalCard = ({
    title,
    budget_from,
    budget_to,
    tasker_img,
    tasker_name,
    budget_type,
    description,
    currencySymbol,
    offer,
    tasker_id,
    show,
    handleClose,
    entity_service_id,
}: BookNowModalCardProps) => {
    const router = useRouter();
    const { mutateAsync, isLoading: uploadPhotoLoading } = useUploadFile();
    const { mutate, isLoading: bookNowLoading } = useBookNowTask();
    const isBookLoading = uploadPhotoLoading || bookNowLoading;
    const [offerSelector, setOfferSelector] = useState<number>();
    const toggleSuccessModal = useToggleSuccessModal();
    const queryClient = new QueryClient();
    const parsedDescription = parse(description ?? "");

    const { data: user } = useUser();

    const { data: profile } = useGetProfile();

    const userFullName =
        (profile?.user &&
            profile?.user?.first_name + " " + profile?.user?.middle_name) ??
        "" + " " + profile?.user?.last_name;

    const handleRoomcreate = async () => {
        if (user?.id) {
            const combinedId =
                user?.id > tasker_id
                    ? user?.id + tasker_id
                    : tasker_id + user?.id;

            try {
                const res = await getDoc(doc(db, "chats", combinedId));

                if (!res.exists()) {
                    await setDoc(doc(db, "chats", combinedId), {
                        messages: [],
                    });

                    try {
                        await updateDoc(doc(db, "userChats", user?.id), {
                            [combinedId + ".userInfo"]: {
                                uid: tasker_id,
                                displayName: tasker_name,
                                photoURL: tasker_img,
                            },
                            [combinedId + ".date"]: serverTimestamp(),
                        });
                    } catch (error) {
                        toast.error("Chat Room creation failed");
                    }

                    await updateDoc(doc(db, "userChats", tasker_id), {
                        [combinedId + ".userInfo"]: {
                            uid: user?.id,
                            displayName: userFullName,
                            photoURL: profile?.user?.profile_image,
                        },
                        [combinedId + ".date"]: serverTimestamp(),
                    });
                }
            } catch (error) {
                toast.error("Chat Room creation failed");
            }
        }
    };

    return (
        <>
            {/* Modal component */}
            <LoadingOverlay
                visible={isBookLoading}
                sx={{ position: "fixed", inset: 0 }}
            />
            <Modal
                show={show && !isBookLoading}
                centered
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Booking Details</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="details">
                        <div className="title d-flex">
                            <h4 className="title-name">
                                Title: <span>{title}</span>
                            </h4>
                        </div>
                        <div className="price d-flex">
                            <h4 className="title-name">
                                Price:
                                <span>
                                    {currencySymbol + " "}
                                    {budget_from ? budget_from + " - " : ""}
                                    {budget_to}
                                    {budget_type === "Hourly"
                                        ? "/hr"
                                        : budget_type === "Monthly"
                                        ? "/mn"
                                        : budget_type === "Daily"
                                        ? "/daily"
                                        : "/project"}
                                </span>
                            </h4>
                        </div>
                        <p className="description">{parsedDescription}</p>
                    </div>
                    <Formik
                        initialValues={{
                            description: "",
                            end_date: "",
                            start_time: "",
                            images: "",
                            entity_service: "",
                            budget_to: budget_to,
                            videos: "",
                            offer: "",
                            city: "",
                            requirements: "",
                            location: "",
                        }}
                        validationSchema={() =>
                            bookServiceSchema({
                                budget_from: budget_from ?? 0,
                                budget_to: budget_to ?? 100000000,
                            })
                        }
                        onSubmit={async (values) => {
                            const imageIds = await mutateAsync({
                                files: values.images,
                            });
                            const videoIds = await mutateAsync({
                                files: values.videos,
                            });
                            const newvalues = {
                                ...values,
                                images: imageIds,
                                videos: videoIds,
                                entity_service: entity_service_id,
                                offer: offerSelector ? [offerSelector] : [],
                                start_time: format(
                                    new Date(values.start_time),
                                    "HH:mm"
                                ),
                            };

                            mutate(newvalues, {
                                onSuccess: () => {
                                    handleClose?.();
                                    queryClient.invalidateQueries([
                                        "notification",
                                    ]);
                                    handleRoomcreate();
                                    toggleSuccessModal(
                                        "Your Booking was sent for approval"
                                    );

                                    router.push("/home");
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            });
                        }}
                    >
                        {({
                            isSubmitting,
                            errors,
                            touched,
                            setFieldValue,
                            getFieldProps,
                            values,
                        }) => (
                            <Form encType="multipart/formData">
                                <div className="problem">
                                    <InputField
                                        labelName="Description"
                                        type="text"
                                        as="textarea"
                                        name="description"
                                        error={errors.description}
                                        touch={touched.description}
                                        placeHolder="Description"
                                        fieldRequired
                                    />
                                </div>
                                <TaskRequirements
                                    initialRequirements={[]}
                                    onRequirementsChange={(requirements) =>
                                        setFieldValue(
                                            "requirements",
                                            requirements
                                        )
                                    }
                                    labelName="Requirements"
                                    description="Add your requirements"
                                />
                                <div className="completion">
                                    <Row>
                                        <Col md={6}>
                                            <MantineDateField
                                                name="start_date"
                                                labelName="Start Date"
                                                placeHolder="Select Start Date"
                                                icon={
                                                    <CalendarTodayOutlined className="svg-icons" />
                                                }
                                                minDate={new Date()}
                                                handleChange={(value) => {
                                                    setFieldValue(
                                                        "start_date",
                                                        format(
                                                            new Date(value),
                                                            "yyyy-MM-dd"
                                                        )
                                                    );
                                                }}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <MantineDateField
                                                name="end_date"
                                                labelName="End Date"
                                                placeHolder="Select End Date"
                                                error={errors.end_date}
                                                touch={touched.end_date}
                                                icon={<CalendarTodayOutlined />}
                                                minDate={new Date()}
                                                handleChange={(value) =>
                                                    setFieldValue(
                                                        "end_date",
                                                        format(
                                                            new Date(value),
                                                            "yyyy-MM-dd"
                                                        )
                                                    )
                                                }
                                                fieldRequired={true}
                                            />
                                        </Col>
                                    </Row>
                                    {!budget_from ? (
                                        ""
                                    ) : (
                                        <Row>
                                            <Col md={6}>
                                                <InputField
                                                    labelName="Budget"
                                                    type="number"
                                                    name="budget_to"
                                                    error={errors.budget_to}
                                                    touch={touched.budget_to}
                                                    min={budget_from}
                                                    max={budget_to}
                                                    placeHolder="Your Price"
                                                    fieldRequired
                                                />
                                            </Col>
                                        </Row>
                                    )}
                                </div>
                                <Row>
                                    <Col md={6} className="estimated-time">
                                        <MantineTimeField
                                            name={"start_time"}
                                            labelName="Start Time"
                                            placeHolder="Select Start Time"
                                            error={errors.start_time}
                                            touch={touched.start_time}
                                            defaultValue={new Date()}
                                            fieldRequired
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "start_time",
                                                    value
                                                );
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-2 mb-3">
                                    <PlacesAutocomplete
                                        size="md"
                                        label="Location"
                                        placeholder="Enter your primary address"
                                        // disabled={isInputDisabled}
                                        error={
                                            touched.location && errors.location
                                                ? errors.location
                                                : undefined
                                        }
                                        {...getFieldProps("location")}
                                        value={values.location}
                                        onPlaceChange={(value) =>
                                            setFieldValue("location", value)
                                        }
                                    />
                                    {/* <Checkbox
                                        label="Share my location"
                                        onChange={(e) => {
                                            setFieldValue(
                                                "location",
                                                e.target.checked.toString()
                                            );

                                            if (
                                                e.currentTarget.checked === true
                                            ) {
                                                navigator.geolocation.getCurrentPosition(
                                                    (pos) => {
                                                        const {
                                                            latitude,
                                                            longitude,
                                                        } = pos.coords;
                                                    }
                                                );
                                            }
                                        }}
                                    /> */}
                                </Row>
                                <SelectCity
                                    onCitySelect={(cityId) =>
                                        setFieldValue("city", cityId)
                                    }
                                    value={values.city}
                                    name={"city"}
                                />

                                <div className="book-now-gallery">
                                    <h4>Gallery</h4>
                                    <p>Add relevant images or videos</p>

                                    <Row className="gx-5">
                                        <Col md={6}>
                                            <CustomDropZone
                                                //  accept={IMAGE_MIME_TYPE}
                                                accept={{
                                                    "image/*": [], // All images
                                                }}
                                                fileType="image"
                                                sx={{ maxWidth: "30rem" }}
                                                maxSize={5 * 1024 ** 2}
                                                name="task-image"
                                                onDrop={(images) =>
                                                    setFieldValue(
                                                        "images",
                                                        images
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="my-4">
                                        <Col md={6}>
                                            <CustomDropZone
                                                accept={[MIME_TYPES.mp4]}
                                                fileType="video"
                                                maxSize={100 * 1024 ** 2}
                                                sx={{ maxWidth: "30rem" }}
                                                name="task-video"
                                                onDrop={(videos) =>
                                                    setFieldValue(
                                                        "videos",
                                                        videos
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                    {offer &&
                                        offer.filter(
                                            (item) =>
                                                item.offer_type === "basic"
                                        ).length > 0 && (
                                            <h4 className="mb-3">
                                                Select Offer
                                            </h4>
                                        )}

                                    <List className="mb-5 book-now-gallery__list">
                                        {offer &&
                                            offer
                                                .filter(
                                                    (offer) =>
                                                        offer.offer_type ===
                                                        "basic"
                                                )
                                                .map((offer, key) => (
                                                    <List.Item
                                                        key={key}
                                                        onClick={() =>
                                                            setOfferSelector(
                                                                offer?.id
                                                            )
                                                        }
                                                        role={"button"}
                                                        data-active={
                                                            offerSelector ===
                                                            offer?.id
                                                        }
                                                        className={
                                                            "book-now-gallery__list--item active mb-3 py-2 ps-3"
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                "d-flex align-items-center gap-3"
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTag}
                                                                className="text-warning"
                                                            />
                                                            {offer?.title}
                                                            {offerSelector ===
                                                                offer?.id && (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheck
                                                                    }
                                                                    className="text-primary"
                                                                />
                                                            )}
                                                        </span>
                                                    </List.Item>
                                                ))}
                                    </List>
                                </div>
                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Book Now"
                                        className="submit-btn"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                        onClick={handleClose}
                                    />
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    );
};
export default BookNowModalCard;
