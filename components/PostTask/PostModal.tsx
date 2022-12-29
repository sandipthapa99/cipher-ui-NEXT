import { CustomDropZone } from "@components/common/CustomDropZone";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import MultiFileDropzone from "@components/common/MultiFileDropzone";
import MultiFileDropzoneDuplicate from "@components/common/MultiFileDropzoneDuplicate";
import { postServiceSchema } from "@components/Task/PostTaskModal/postTaskSchema";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import {
    faCalendarDays,
    faSquareCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MIME_TYPES } from "@mantine/dropzone";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditTask } from "hooks/task/use-edit-task";
import { useUploadFile } from "hooks/use-upload-file";
import * as _ from "lodash";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Button, Col, FormCheck, FormGroup, Row } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { PostTaskProps } from "types/postTaskData";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITask } from "types/task";
import extractContent from "utils/extractString";
import { PostTaskFormData } from "utils/formData";
import { isSubmittingClass } from "utils/helpers";

import { PostCard } from "./PostCard";
const PostModal = ({
    setshowPostModel,
}: {
    setshowPostModel: Dispatch<SetStateAction<boolean>>;
}) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const [showVariable, setShowVariable] = useState({
        showBudget: false,
        showTime: false,
    });
    const router = useRouter();

    const taskId = router.query?.id;
    const queryClient = useQueryClient();
    const taskDetail = queryClient.getQueryData<ITask>(["task-detail", taskId]);
    const [isRemote, setIsRemote] = useState(
        taskDetail?.location === "remote" ? true : false
    );
    // const [isOnPremise, setIsOnPremise] = useState(isRemote ? false : true);
    const { mutate } = useEditTask();

    const getServiceImages =
        taskDetail?.images &&
        taskDetail?.images.map((val) => {
            const fileName = _.split(val?.name, "/");
            return {
                id: val?.id,
                src: val?.media,
                file: {
                    name: _.last(fileName),
                    size: val?.size,
                    type: val?.media_type,
                },
            };
        });

    const editValues: PostTaskProps = {
        title: taskDetail?.title,
        description: extractContent(taskDetail?.description),
        highlights: taskDetail?.highlights,
        address: taskDetail?.city.name,
        category: taskDetail?.service?.category.name,
        location: isRemote ? "onPremise" : "remote",
        budget: taskDetail?.budget_to ? taskDetail?.budget_to : "",
        minBudget: taskDetail?.budget_to,
        maxBudget: taskDetail?.budget_from,
        images: taskDetail?.images as any[],
        imagePreviewUrl: getServiceImages as any[],
        videos: taskDetail?.videos as any[],
        videoPreviewUrl: taskDetail?.videos as any[],
        date: taskDetail?.start_date ? parseISO(taskDetail?.start_date) : "",

        date_from: taskDetail?.start_date
            ? parseISO(taskDetail?.start_date)
            : "",
        date_to: taskDetail?.end_date ? parseISO(taskDetail?.end_date) : "",
    };

    const { mutateAsync: uploadFileMutation } = useUploadFile();

    const initialHighlights = taskDetail?.highlights
        ? taskDetail?.highlights
        : [];

    return (
        <>
            {/* Modal component */}
            <div className="post-task-modal">
                <h2>Edit a Task</h2>
                <div className="post-task-form">
                    <Formik
                        enableReinitialize
                        initialValues={
                            taskDetail ? { ...editValues } : PostTaskFormData
                        }
                        validationSchema={postServiceSchema}
                        onSubmit={async (values) => {
                            let newUploadImageID: number[] = [];
                            if (values.images.some((val) => val?.path)) {
                                const uploadedImageIds =
                                    await uploadFileMutation({
                                        files: values?.images.filter(
                                            (val) => val?.path
                                        ) as unknown as string,
                                        media_type: "image",
                                    });
                                newUploadImageID = uploadedImageIds;
                            }

                            let newUploadVideoID: number[] = [];
                            if (values.images.some((val) => val?.path)) {
                                const uploadedVideosIds =
                                    await uploadFileMutation({
                                        files: values?.images.filter(
                                            (val) => val?.path
                                        ) as unknown as string,
                                        media_type: "image",
                                    });
                                newUploadVideoID = uploadedVideosIds;
                            }

                            const imageIds = values?.images
                                .filter((val) => !val?.path)
                                .map((val) => val.id);
                            const videoIds = values?.images
                                .filter((val) => !val?.path)
                                .map((val) => val.id);

                            const imagesIds = [
                                ...imageIds,
                                ...newUploadImageID,
                            ];
                            const videosIds = [
                                ...videoIds,
                                ...newUploadVideoID,
                            ];

                            const postTaskPayload = {
                                ...values,
                                highlights: values.highlights,
                                images: imagesIds,
                                videos: videosIds,
                                extra_data: [],
                            };
                            mutate(
                                { id: String(taskId), data: postTaskPayload },
                                {
                                    onSuccess: () => {
                                        toggleSuccessModal(
                                            "Task Updated Successfully"
                                        );

                                        queryClient.invalidateQueries([
                                            ReactQueryKeys.TASK_DETAIL,
                                            taskId,
                                        ]);

                                        queryClient.invalidateQueries([
                                            ReactQueryKeys.TASKS,
                                        ]);
                                        queryClient.setQueryData(
                                            ["task-detail"],
                                            taskId
                                        );
                                        setshowPostModel(false);
                                    },
                                }
                            );
                        }}
                    >
                        {({
                            isSubmitting,
                            errors,
                            touched,
                            getFieldProps,
                            setFieldValue,
                        }) => (
                            <Form>
                                <pre>{JSON.stringify(errors, null, 4)}</pre>
                                <InputField
                                    type="text"
                                    name="title"
                                    labelName="Title"
                                    error={errors.title}
                                    touch={touched.title}
                                    fieldRequired
                                    placeHolder="Enter your Title"
                                />
                                <InputField
                                    name="description"
                                    labelName="Task Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Task Description"
                                    fieldRequired
                                    as="textarea"
                                />
                                <h4>When do you need this done?</h4>
                                <p>
                                    This helps tasker to find about your
                                    requirements better.
                                </p>

                                {/* <AddRequirements
                                    onSubmit={(value) =>
                                        setFieldValue("highlights", value)
                                    }
                                    placeHolder="Requirements..."
                                /> */}
                                <TaskRequirements
                                    initialRequirements={initialHighlights}
                                    onRequirementsChange={(requirements) =>
                                        setFieldValue(
                                            "highlights",
                                            requirements
                                        )
                                    }
                                    //   error={getFieldError("highlights")}
                                    {...getFieldProps("highlights")}
                                    labelName="Highlights"
                                    description="This helps clients to find about your service highlights"
                                />
                                <br />
                                <h4>Select Task Type</h4>
                                <span className="d-flex mb-4">
                                    <FormGroup>
                                        <FormCheck
                                            type="radio"
                                            label="Remote"
                                            className="me-3"
                                            defaultChecked={isRemote}
                                            {...getFieldProps("location")}
                                            onChange={(event) => {
                                                setFieldValue(
                                                    "location",
                                                    event.target.value
                                                );
                                            }}
                                        />
                                        <FormCheck
                                            type="radio"
                                            label="On premise"
                                            className="mb-8"
                                            {...getFieldProps("location")}
                                            defaultChecked={!isRemote}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    "location",
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </FormGroup>
                                </span>
                                <InputField
                                    type="text"
                                    name="address"
                                    labelName="Address"
                                    error={errors.address}
                                    touch={touched.address}
                                    fieldRequired
                                    placeHolder="Default Address (Home)"
                                />
                                <InputField
                                    type="text"
                                    name="category"
                                    labelName="Category"
                                    error={errors.category}
                                    touch={touched.category}
                                    fieldRequired
                                    placeHolder="Enter your category"
                                />
                                <h4>Budget</h4>
                                <span className="d-flex mb-4">
                                    <FormCheck
                                        type="radio"
                                        name="budget"
                                        label="Fixed"
                                        className="me-3"
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showBudget: false,
                                                };
                                            })
                                        }
                                    />
                                    <FormCheck
                                        type="radio"
                                        name="budget"
                                        label="Variable"
                                        className="mb-8"
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showBudget: true,
                                                };
                                            })
                                        }
                                    />
                                </span>
                                <Row className="gx-5">
                                    {showVariable.showBudget ? (
                                        <>
                                            <Col md={4}>
                                                <InputField
                                                    type="text"
                                                    name="minBudget"
                                                    error={errors.minBudget}
                                                    touch={touched.minBudget}
                                                    fieldRequired
                                                    className="mb-0"
                                                    placeHolder="Enter your price"
                                                />
                                            </Col>
                                            To
                                            <Col md={4}>
                                                <InputField
                                                    type="text"
                                                    name="maxBudget"
                                                    error={errors.maxBudget}
                                                    touch={touched.maxBudget}
                                                    fieldRequired
                                                    className="mb-0"
                                                    placeHolder="Enter your price"
                                                />
                                            </Col>
                                        </>
                                    ) : (
                                        <Col md={4}>
                                            <InputField
                                                type="text"
                                                name="budget"
                                                error={errors.budget}
                                                touch={touched.budget}
                                                fieldRequired
                                                className="mb-0"
                                                placeHolder="Enter your price"
                                            />
                                        </Col>
                                    )}
                                </Row>
                                <h4>When do you need this done?</h4>
                                <p>
                                    This helps tasker to find about your
                                    requirements better.
                                </p>
                                <Col md={5}>
                                    <MultiFileDropzone
                                        name="images"
                                        labelName="Upload your images"
                                        textMuted="More than 5 images are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 4MB."
                                        error={errors.images as string}
                                        touch={
                                            touched.images as unknown as boolean
                                        }
                                        imagePreview="imagePreviewUrl"
                                        maxFiles={5}
                                        maxSize={4}
                                        multiple
                                        showFileDetail
                                    />
                                </Col>
                                <h4>When do you need this done?</h4>
                                <p>
                                    This helps tasker to find about your
                                    requirements better.
                                </p>
                                <Col md={5}>
                                    <MultiFileDropzone
                                        name="videos"
                                        labelName="Upload your Video"
                                        textMuted="More than 5 images are not allowed to upload. File supported: .jpeg, .jpg, .png. Maximum size 4MB."
                                        error={errors.videos as string}
                                        touch={
                                            touched.videos as unknown as boolean
                                        }
                                        imagePreview="videoPreviewUrl"
                                        accept={["video/mp4"]}
                                        maxFiles={2}
                                        maxSize={100}
                                        multiple
                                        showFileDetail
                                    />
                                </Col>
                                <h4>When do you need this done?</h4>
                                <span className="d-flex mb-4">
                                    <FormCheck
                                        type="radio"
                                        name="time"
                                        label="Fixed"
                                        className="me-3"
                                        defaultChecked
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showTime: false,
                                                };
                                            })
                                        }
                                    />
                                    <FormCheck
                                        type="radio"
                                        name="time"
                                        label="Custom"
                                        className="mb-8"
                                        onChange={() =>
                                            setShowVariable((prev) => {
                                                return {
                                                    ...prev,
                                                    showTime: true,
                                                };
                                            })
                                        }
                                    />
                                </span>
                                {showVariable.showTime ? (
                                    <Row>
                                        <Col md={5}>
                                            {/* <DatePickerField
                                                name="date_from"
                                                labelName="Start date"
                                                placeHolder="dd/mm/yy"
                                                touch={touched.date_from}
                                                error={errors.date_from}
                                            /> */}
                                            <MantineDateField
                                                name="date_from"
                                                labelName="Start Date"
                                                placeHolder="1999-06-03"
                                                touch={touched.date_from}
                                                error={errors.date_from}
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                        className="svg-icons"
                                                    />
                                                }
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
                                        <Col md={{ span: 5, offset: 2 }}>
                                            {/* <DatePickerField
                                                name="date_to"
                                                labelName="End date"
                                                placeHolder="dd/mm/yy"
                                                touch={touched.date_to}
                                                error={errors.date_to}
                                            /> */}
                                            <MantineDateField
                                                name="date_from"
                                                labelName="Start Date"
                                                placeHolder="1999-06-03"
                                                touch={touched.date_from}
                                                error={errors.date_from}
                                                icon={
                                                    <FontAwesomeIcon
                                                        icon={faCalendarDays}
                                                        className="svg-icons"
                                                    />
                                                }
                                                handleChange={(value) => {
                                                    setFieldValue(
                                                        "date_from",
                                                        format(
                                                            new Date(value),
                                                            "yyyy-MM-dd"
                                                        )
                                                    );
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                ) : (
                                    <Col md={5}>
                                        {/* <DatePickerField
                                            name="date"
                                            labelName="Date"
                                            placeHolder="dd/mm/yy"
                                            touch={touched.date}
                                            error={errors.date}
                                        /> */}
                                        <MantineDateField
                                            name="date"
                                            labelName="Start Date"
                                            placeHolder="1999-06-03"
                                            touch={touched.date}
                                            error={errors.date_from}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
                                        />
                                    </Col>
                                )}

                                <div className="d-flex justify-content-center">
                                    <Button
                                        className="btn close-btn p-3 h-25"
                                        onClick={() => setshowPostModel(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Apply"
                                        className="submit-btn ms-3"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
            />
        </>
    );
};
export default PostModal;
