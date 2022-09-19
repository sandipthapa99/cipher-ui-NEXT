import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import { Checkbox, createStyles, LoadingOverlay } from "@mantine/core";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useBookNowTask } from "hooks/task/use-book--now-task";
import { useUploadFile } from "hooks/use-upload-file";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { BookNowModalCardProps } from "types/bookNow";
import { axiosClient } from "utils/axiosClient";
import { BookServiceFormData } from "utils/formData";
import { bookServiceSchema } from "utils/formValidation/bookServiceFormValidation";
import { isSubmittingClass } from "utils/helpers";

import { CustomDropZone } from "./CustomDropZone";
import { useStyles } from "./Search";

const useUploadImage = () =>
    useMutation<number[] | null, AxiosError, FormData>((formData) =>
        axiosClient
            .post<{ data: number[] }>("/task/filestore/", formData)
            .then((res) => {
                if (res.data.data) return res.data.data;
                return null;
            })
    );

const useBookNowService = () =>
    useMutation<string, AxiosError, any>((payload) =>
        axiosClient
            .post<{ message: string }>("/task/service/booking/", payload)
            .then((res) => res.data.message)
    );

const BookNowModalCard = ({
    title,
    budget_from,
    budget_to,
    budget_type,
    service_id,
    description,
    show,
    setShow,
    handleClose,
    entity_service_id,
}: BookNowModalCardProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { classes } = useStyles();
    const { mutateAsync, isLoading: uploadPhotoLoading } = useUploadFile();
    const { mutate, isLoading: bookNowLoading } = useBookNowTask();
    // const { mutate: bookNowServiceMutation, isLoading: bookServiceLoading } =
    //     useBookNowService();
    // const { mutate: uploadImageMutation, isLoading: uploadImageLoading } =
    //     useUploadImage();
    // const loadingOverlayVisible = useMemo(
    //     () => bookServiceLoading || uploadImageLoading,
    //     [bookServiceLoading, uploadImageLoading]
    // );

    // if (loadingOverlayVisible)
    //     return (
    //         <LoadingOverlay
    //             visible={loadingOverlayVisible}
    //             className={classes.overlay}
    //             overlayBlur={2}
    //         />
    //     );
    const isBookLoading = uploadPhotoLoading || bookNowLoading;

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
                                Price:{" "}
                                <span>
                                    {budget_from
                                        ? `${budget_from} - ${budget_to}`
                                        : `${budget_to} ${budget_type}`}
                                    {/* // {budget_from}{" "}
                                    {budget_to && "-" + budget_to}
                                    // {budget_type} */}
                                </span>
                            </h4>
                        </div>
                        <p className="description">{description}</p>
                    </div>
                    <Formik
                        initialValues={BookServiceFormData}
                        validationSchema={bookServiceSchema}
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

                            console.log("abc", newvalues);

                            mutate(newvalues, {
                                onSuccess: () => {
                                    handleClose?.();
                                    toast.success("Task Booked Successfully");
                                    router.push("/checkout");
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            });

                            // if (values.images && values.images.length > 0) {
                            //     for (const image of values.images) {
                            //         imageFormData.append("medias", image);
                            //         imageFormData.append("media_type", "image");
                            //         imageFormData.append(
                            //             "placeholder",
                            //             "image"
                            //         );
                            //     }

                            //     uploadImageMutation(imageFormData, {
                            //         onSuccess: (imageIds) => {
                            //             const start_date = format(
                            //                 new Date(values.start_date),
                            //                 "yyyy-MM-dd"
                            //             );
                            //             const end_date = format(
                            //                 new Date(values.end_date),
                            //                 "yyyy-MM-dd"
                            //             );

                            //             const bookNowPayload = {
                            //                 ...values,
                            //                 start_date: start_date,
                            //                 end_date: end_date,
                            //                 service: service_id,
                            //             };

                            //             delete bookNowPayload.imagePreviewUrl;

                            //             if (imageIds && imageIds?.length > 0)
                            //                 bookNowPayload.images = imageIds;

                            //             bookNowServiceMutation(bookNowPayload, {
                            //                 onSuccess: (message) => {
                            //                     toast.success(
                            //                         "Successfully booked a service"
                            //                     );
                            //                     setShow(false);
                            //                     queryClient.invalidateQueries([
                            //                         "book-now",
                            //                     ]);

                            //                     router.push({
                            //                         pathname: "task/checkout",
                            //                     });
                            //                 },
                            //             });
                            //         },
                            //     });
                            // } else {
                            //     const start_date = format(
                            //         new Date(values.start_date),
                            //         "yyyy-MM-dd"
                            //     );
                            //     const end_date = format(
                            //         new Date(values.end_date),
                            //         "yyyy-MM-dd"
                            //     );

                            //     const bookNowPayload = {
                            //         ...values,
                            //         start_date: start_date,
                            //         end_date: end_date,
                            //         service: service_id,
                            //     };

                            //     delete bookNowPayload.imagePreviewUrl;

                            //     // bookNowServiceMutation(bookNowPayload, {
                            //     //     onSuccess: (message) => {
                            //     //         toast.success(
                            //     //             "Successfully booked a service"
                            //     //         );
                            //     //         queryClient.invalidateQueries([
                            //     //             "book-now",
                            //     //         ]);

                            //     //         router.push({
                            //     //             pathname: "/task/checkout",
                            //     //         });
                            //     //     },
                            //     // });
                            // }
                        }}
                    >
                        {({
                            isSubmitting,
                            errors,
                            touched,
                            setFieldValue,
                            values,
                        }) => (
                            <Form encType="multipart/formData">
                                {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
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
                                    description="Add Requirements"
                                />
                                <div className="completion">
                                    <Row>
                                        <Col md={6}>
                                            <InputField
                                                labelName="Start Date"
                                                type="date"
                                                name="start_date"
                                                error={errors.start_date}
                                                touch={touched.start_date}
                                                placeHolder="dd/mm/yyy"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <InputField
                                                labelName="End Date"
                                                type="date"
                                                name="end_date"
                                                error={errors.end_date}
                                                touch={touched.end_date}
                                                placeHolder="dd/mm/yyy"
                                                fieldRequired
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <InputField
                                                labelName="Budget From"
                                                type="number"
                                                name="budget_from"
                                                error={errors.budget_from}
                                                touch={touched.budget_from}
                                                placeHolder="0"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <InputField
                                                labelName="Budget To"
                                                type="number"
                                                name="budget_to"
                                                error={errors.budget_to}
                                                touch={touched.budget_to}
                                                placeHolder="0"
                                                fieldRequired
                                            />
                                        </Col>
                                    </Row>
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
                                            {/* <DragDrop
                                                name="gallery"
                                                image="/service-details/file-upload.svg"
                                                fileType="Image/Video"
                                                maxImageSize={20}
                                                field={setFieldValue}
                                            /> */}

                                            {/* <MultiImageDropzone
                                                name="images"
                                                labelName="Upload your image"
                                                textMuted="More than 5 image are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 1MB."
                                                imagePreview="imagePreviewUrl"
                                                maxFiles={5}
                                                multiple
                                                maxSize={200}
                                                minSize={20}
                                                showFileDetail
                                                type="Image/Video"
                                            /> */}
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
