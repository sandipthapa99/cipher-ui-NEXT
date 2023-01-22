import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import { List, LoadingOverlay } from "@mantine/core";
import {
    CalendarTodayOutlined,
    Check,
    LocalOffer,
    LocalOfferOutlined,
} from "@mui/icons-material";
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
import MantineDateField from "./MantineDateField";
import MantineTimeField from "./MantineTimeField";
import MultiFileDropzone from "./MultiFileDropzone";

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

    //To assign max file number of Images and videos
    const MaxImages = 5;
    const MaxVideos = 1;

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
                            images: [],
                            imagePreviewUrl: [],
                            videos: [],
                            videoPreviewUrl: [],
                            entity_service: "",
                            budget_to: budget_to,
                            offer: "",
                            city: "",
                            requirements: "",
                            location: "",
                        }}
                        validationSchema={() =>
                            bookServiceSchema({
                                budget_from: budget_from ?? 0,
                                budget_to: budget_to ?? 100000000,
                                maxImages: MaxImages,
                                maxVideos: MaxVideos,
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
                            setFieldTouched,
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
                                <PlacesAutocomplete
                                    size="md"
                                    label="Location"
                                    value={values.location}
                                    className="mb-4"
                                    placeholder="Enter your primary address"
                                    error={
                                        touched.location && errors.location
                                            ? errors.location
                                            : undefined
                                    }
                                    withAsterisk
                                    onBlur={() => setFieldTouched("location")}
                                    name={"location"}
                                    onPlaceChange={(value) =>
                                        setFieldValue("location", value)
                                    }
                                />
                                <SelectCity
                                    onCitySelect={(cityId) =>
                                        setFieldValue("city", cityId)
                                    }
                                    value={values.city}
                                    error={errors.city}
                                    onBlur={() => setFieldTouched("city")}
                                    touch={touched.city}
                                    name={"city"}
                                />

                                <div className="book-now-gallery">
                                    <h4>Gallery</h4>
                                    <p>Add relevant images or videos</p>
                                    <Col md={6} className={"mb-4"}>
                                        <MultiFileDropzone
                                            name="images"
                                            labelName="Upload your images"
                                            textMuted={`More than ${MaxImages} images cannot be uploaded. File supported: .jpeg, .jpg, .png. Maximum size 4MB.`}
                                            error={
                                                (errors.imagePreviewUrl as string) ||
                                                (errors.images as string)
                                            }
                                            touch={
                                                touched.images as unknown as boolean
                                            }
                                            imagePreview="imagePreviewUrl"
                                            maxFiles={MaxImages}
                                            maxSize={4}
                                            multiple
                                            showFileDetail
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <MultiFileDropzone
                                            name="videos"
                                            labelName="Upload your Videos"
                                            textMuted={`More than ${MaxVideos} videos cannot be uploaded. Maximum size 10MB.`}
                                            error={
                                                (errors.videoPreviewUrl as string) ||
                                                (errors.videos as string)
                                            }
                                            touch={
                                                touched.videos as unknown as boolean
                                            }
                                            accept={["video/mp4"]}
                                            imagePreview="videoPreviewUrl"
                                            maxFiles={MaxVideos}
                                            maxSize={100}
                                            multiple
                                            showFileDetail
                                        />
                                    </Col>
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
                                                            <LocalOffer className="text-warning" />
                                                            {offer?.title}
                                                            {offerSelector ===
                                                                offer?.id && (
                                                                <Check className="text-primary" />
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
