import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import { faCalendarDays } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, LoadingOverlay } from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useBookNowTask } from "hooks/task/use-book--now-task";
import { useUploadFile } from "hooks/use-upload-file";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { BookNowModalCardProps } from "types/bookNow";
import { bookServiceSchema } from "utils/formValidation/bookServiceFormValidation";
import { isSubmittingClass } from "utils/helpers";

import { CustomDropZone } from "./CustomDropZone";
import MantineDateField from "./MantineDateField";

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
    budget_type,
    description,
    currencySymbol,
    show,
    handleClose,
    entity_service_id,
}: BookNowModalCardProps) => {
    const router = useRouter();
    const { mutateAsync, isLoading: uploadPhotoLoading } = useUploadFile();
    const { mutate, isLoading: bookNowLoading } = useBookNowTask();
    const isBookLoading = uploadPhotoLoading || bookNowLoading;

    const parsedDescription = parse(description ?? "");

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
                                        : "/Project"}
                                </span>
                            </h4>
                        </div>
                        <p className="description">{parsedDescription}</p>
                    </div>
                    <Formik
                        initialValues={{
                            description: "",
                            start_date: "",
                            end_date: "",
                            start_time: 1,
                            images: "",
                            entity_service: "",
                            budget_to: budget_to,
                            videos: "",
                            requirements: "",
                            location: "false",
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
                                requirements: JSON.stringify(
                                    values.requirements
                                ),
                            };

                            mutate(newvalues, {
                                onSuccess: () => {
                                    handleClose?.();
                                    // toast.success(
                                    //     "Your Booking was sent for approval"
                                    // );
                                    router.push("/home");
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            });
                        }}
                    >
                        {({ isSubmitting, errors, touched, setFieldValue }) => (
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
                                <AddRequirements
                                    onSubmit={(value) =>
                                        setFieldValue("requirements", value)
                                    }
                                    title="Highligits"
                                    placeHolder="e.g.Bring something"
                                    description="Add requirements"
                                />
                                <div className="completion">
                                    <Row>
                                        <Col md={6}>
                                            <MantineDateField
                                                name="start_date"
                                                labelName="Start Date"
                                                placeHolder="Select Start Date"
                                                error={errors.start_date}
                                                touch={touched.start_date}
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                        className="svg-icons"
                                                    />
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
                                                fieldRequired={true}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <MantineDateField
                                                name="end_date"
                                                labelName="End Date"
                                                placeHolder="Select End Date"
                                                error={errors.end_date}
                                                touch={touched.end_date}
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                    />
                                                }
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
                                        <InputField
                                            labelName="Start Time"
                                            type="time"
                                            name="start_time"
                                            min="1"
                                            error={errors.start_time}
                                            touch={touched.start_time}
                                            placeHolder="00:00"
                                            fieldRequired
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-2 mb-3">
                                    <Checkbox
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
                                                        console.log(
                                                            latitude,
                                                            longitude
                                                        );
                                                    }
                                                );
                                            }
                                        }}
                                    />
                                </Row>
                                <SelectCity
                                    onCitySelect={(cityId) =>
                                        setFieldValue("city", cityId)
                                    }
                                />

                                <div className="book-now-gallery">
                                    <h4>Gallery</h4>
                                    <p>Add relevant images or videos</p>

                                    <Row className="gx-5">
                                        <Col md={6}>
                                            <CustomDropZone
                                                accept={IMAGE_MIME_TYPE}
                                                fileType="image"
                                                sx={{ maxWidth: "30rem" }}
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
                                    <Row className="mt-4">
                                        <Col md={6}>
                                            <CustomDropZone
                                                accept={IMAGE_MIME_TYPE}
                                                fileType="video"
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

                                    <div className="size-warning">
                                        {/* <FontAwesomeIcon
                                            icon={faCircleInfo}
                                            className="svg-icon"
                                        /> */}
                                        {/* <p>
                                            Images and videos should not be more
                                            than 200MB
                                        </p> */}
                                    </div>
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
