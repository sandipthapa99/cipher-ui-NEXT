import { AddServiceModalComponent } from "@components/AddServices/AddServiceModalComponent";
import BigButton from "@components/common/Button";
import { CustomDropZone } from "@components/common/CustomDropZone";
import { RichText } from "@components/RichText";
import { postTaskSchema } from "@components/Task/PostTaskModal/postTaskSchema";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import type { TaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { SelectTaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { ServiceOptions } from "@components/Task/PostTaskModal/ServiceOptions";
import { TaskBudget } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskCurrency } from "@components/Task/PostTaskModal/TaskCurrency";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import {
    faCalendarDays,
    faSquareCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingOverlay, Radio } from "@mantine/core";
import {
    Anchor,
    Box,
    Checkbox,
    Modal,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import RichTextEditor from "@mantine/rte";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useFormik } from "formik";
import { useEditTask } from "hooks/task/use-edit-task";
import { usePostTask } from "hooks/task/use-post-task";
import { useUploadFile } from "hooks/use-upload-file";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useEditTaskDetail } from "store/use-edit-task";
import {
    usePostTaskModalType,
    useShowPostTaskModal,
    useToggleShowPostTaskModal,
} from "store/use-show-post-task";
import { useToggleSuccessModal } from "store/use-success-modal";
import { ReactQueryKeys } from "types/queryKeys";
import { safeParse } from "utils/safeParse";
import { toast } from "utils/toast";

export interface PostTaskPayload {
    title: string;
    description: string;
    highlights: string[];
    service: string;
    city: string;
    location: TaskType;
    currency: string;
    budget_type: string;
    budget_from: number | string;
    budget_to: number | string;
    is_negotiable: boolean;
    images: string;
    videos: string;
    estimated_time: number;
    is_recursion: boolean;
    is_requested: boolean;
    is_everyday: boolean;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    share_location: boolean;
}

export const PostTaskModal = () => {
    const [choosedValue, setChoosedValue] = useState("task");
    const toggleSuccessModal = useToggleSuccessModal();
    const queryClient = useQueryClient();
    const { mutate: createTaskMutation, isLoading: createTaskLoading } =
        usePostTask();
    const { mutate: editTaskMutation, isLoading: editTaskLoading } =
        useEditTask();
    const showPostTaskModalType = usePostTaskModalType();
    const showPostTaskModal = useShowPostTaskModal();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();

    const editTaskDetail = useEditTaskDetail();

    const taskDetail =
        showPostTaskModalType === "EDIT" ? editTaskDetail : undefined;
    const [termsAccepted, setTermsAccepted] = useState(true);

    const getInitialImageIds = useCallback(
        () => (editTaskDetail?.images ?? []).map((image) => image.id),
        [editTaskDetail?.images]
    );
    const getInitialVideoIds = useCallback(
        () => (editTaskDetail?.videos ?? []).map((video) => video.id),
        [editTaskDetail?.videos]
    );

    const [initialImageIds, setInitialImageIds] = useState<number[]>(() =>
        getInitialImageIds()
    );
    const [initialVideoIds, setInitialVideoIds] = useState<number[]>(() =>
        getInitialVideoIds()
    );

    const { mutateAsync: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();

    useEffect(() => {
        setInitialImageIds(getInitialImageIds());
    }, [getInitialImageIds]);

    useEffect(() => {
        setInitialVideoIds(getInitialVideoIds());
    }, [getInitialVideoIds]);

    // const initialHighlights = safeParse<string[]>({
    //     rawString: taskDetail?.highlights ?? "[]",
    //     initialData: [],
    // });
    const formik = useFormik<PostTaskPayload>({
        initialValues: {
            title: taskDetail ? taskDetail.title : "",
            description: taskDetail ? taskDetail.description : "",
            //   highlights: taskDetail ? initialHighlights : [],
            highlights: [],
            city: taskDetail ? String(taskDetail?.city?.id) : "",
            location: taskDetail ? (taskDetail.location as TaskType) : "remote",
            budget_type: "Project",
            budget_from: taskDetail ? Number(taskDetail.budget_from) : "",
            budget_to: taskDetail ? Number(taskDetail.budget_to) : "",
            service: taskDetail ? taskDetail.service.id ?? ({} as any) : "",
            is_negotiable: false,
            estimated_time: 5,
            is_recursion: false,
            is_requested: true,
            is_everyday: false,
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            currency: taskDetail ? String(taskDetail?.currency?.code) : "NPR",
            images: "",
            videos: "",
            is_active: true,
            share_location: true,
        },
        enableReinitialize: true,
        validationSchema: postTaskSchema,
        onSubmit: async (values, action) => {
            if (!termsAccepted) {
                toast.error(
                    "You must accept the terms and conditions before posting a task"
                );
                return;
            }
            const uploadedImageIds = await uploadFileMutation({
                files: values.images,
                media_type: "image",
            });
            const uploadedVideoIds = await uploadFileMutation({
                files: values.videos,
                media_type: "video",
            });
            const imageIds = [...uploadedImageIds, ...initialImageIds];
            const videoIds = [...uploadedVideoIds, ...initialVideoIds];

            const postTaskPayload = {
                ...values,
                highlights: values.highlights,
                images: imageIds,
                videos: videoIds,
                extra_data: [],
            };

            const updatedPayload = Object.entries(postTaskPayload).reduce(
                (acc, curr) => {
                    const [key, value] = curr;
                    if (value) acc[key] = value;
                    return acc;
                },
                {} as Record<string, unknown>
            );

            if (showPostTaskModalType === "EDIT" && taskDetail) {
                editTaskMutation(
                    { id: taskDetail.id, data: updatedPayload },
                    {
                        onSuccess: async () => {
                            handleCloseModal();
                            await queryClient.invalidateQueries([
                                ReactQueryKeys.TASK_DETAIL,
                                taskDetail.id,
                            ]);
                            queryClient.invalidateQueries(["all-tasks"]);

                            toggleSuccessModal("Task Edited Successfully");
                        },
                    }
                );
                return;
            }
            // createTaskMutation(updatedPayload, {
            //     onSuccess: async () => {
            //         handleCloseModal();
            //         action.resetForm();
            //         toggleSuccessModal("Task Posted Successfully");
            //         await queryClient.invalidateQueries([ReactQueryKeys.TASKS]);
            //         await queryClient.invalidateQueries(["notification"]);
            //         await queryClient.invalidateQueries(["my-task"]);
            //     },
            //     onError: (error) => {
            //         toast.error(error.message);
            //     },
            // });
        },
    });

    const {
        getFieldProps,
        handleSubmit,
        touched,
        errors,
        setFieldValue,
        values,
    } = formik;
    const getFieldError = (key: keyof PostTaskPayload) =>
        touched[key] && errors[key] ? (errors[key] as string) : null;

    const handleCloseModal = () => {
        formik.resetForm();
        toggleShowPostTaskModal("CREATE");
        setChoosedValue("task");
    };
    const isCreateTaskLoading =
        createTaskLoading || uploadFileLoading || editTaskLoading;
    return (
        <>
            <LoadingOverlay
                visible={isCreateTaskLoading}
                sx={{ position: "fixed", inset: 0 }}
            />

            <Modal
                opened={!isCreateTaskLoading && showPostTaskModal}
                onClose={handleCloseModal}
                closeOnClickOutside={false}
                overlayOpacity={0.55}
                overlayBlur={3}
                title="Post a Task or Service"
                size="xl"
            >
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                {showPostTaskModalType === "CREATE" && (
                    <div className="choose-email-or-phone mb-5">
                        <Radio.Group
                            label="Please select task or service which you want to post "
                            onChange={(value) => setChoosedValue(value)}
                            size="sm"
                            defaultValue="task"
                        >
                            <Radio value="task" label="Post Task" />
                            <Radio value="service" label="Post Service" />
                        </Radio.Group>
                    </div>
                )}
                {choosedValue === "task" ? (
                    <form encType="multipart/formData" onSubmit={handleSubmit}>
                        <Stack spacing="md">
                            <TextInput
                                placeholder="Enter your title"
                                label="Title"
                                required
                                {...getFieldProps("title")}
                                error={getFieldError("title")}
                            />

                            <RichText
                                {...getFieldProps("description")}
                                value={values.description ?? ""}
                                onChange={(value) =>
                                    setFieldValue("description", value)
                                }
                                placeholder="Enter your description"
                                aria-errormessage="123"
                            />
                            <TaskRequirements
                                initialRequirements={[]}
                                onRequirementsChange={(requirements) =>
                                    setFieldValue("highlights", requirements)
                                }
                                error={getFieldError("highlights")}
                                {...getFieldProps("highlights")}
                                labelName="Requirements"
                                description="This helps the tasker understand about your task better"
                            />
                            <Row>
                                <Col md={6}>
                                    <DatePicker
                                        placeholder="Start date"
                                        label="Start date"
                                        withAsterisk
                                        minDate={new Date()}
                                        {...getFieldProps("start_date")}
                                        error={getFieldError("start_date")}
                                        onChange={(event) => {
                                            if (event !== null) {
                                                setFieldValue(
                                                    "start_date",
                                                    format(
                                                        new Date(event),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }
                                        }}
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                className="svg-icons"
                                            />
                                        }
                                    />
                                </Col>

                                <Col md={6}>
                                    <DatePicker
                                        placeholder="End date"
                                        label="End date"
                                        // name="end_date"
                                        withAsterisk
                                        {...getFieldProps("end_date")}
                                        error={getFieldError("end_date")}
                                        minDate={new Date()}
                                        onChange={(event) => {
                                            if (event !== null) {
                                                setFieldValue(
                                                    "end_date",
                                                    format(
                                                        new Date(event),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }
                                        }}
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                                className="svg-icons"
                                            />
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <TimeInput
                                        label="Start time"
                                        format="12"
                                        defaultValue={new Date()}
                                        onChange={(event) => {
                                            if (event !== null) {
                                                setFieldValue(
                                                    "start_time",
                                                    format(
                                                        new Date(event),
                                                        "hh:mm aa"
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                </Col>
                                <Col md={3}>
                                    <TimeInput
                                        label="End time"
                                        format="12"
                                        onChange={(event) => {
                                            if (event !== null) {
                                                setFieldValue(
                                                    "end_time",
                                                    format(
                                                        new Date(event),
                                                        "hh:mm aa"
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                </Col>
                            </Row>

                            <SelectCity
                                onCitySelect={(cityId) =>
                                    setFieldValue("city", cityId)
                                }
                                value={taskDetail ? taskDetail?.city : ""}
                            />
                            <ServiceOptions
                                {...getFieldProps("service")}
                                onServiceChange={(service) =>
                                    setFieldValue("service", service)
                                }
                                error={getFieldError("service")}
                                data={
                                    taskDetail?.service
                                        ? [
                                              {
                                                  id: taskDetail?.service?.id,
                                                  label: taskDetail?.service
                                                      ?.title,
                                                  value: taskDetail?.service
                                                      ?.id,
                                              },
                                          ]
                                        : []
                                }
                                value={
                                    taskDetail ? taskDetail?.service?.id : ""
                                }
                            />
                            <SelectTaskType
                                setFieldValue={setFieldValue}
                                onTypeChange={(type) =>
                                    setFieldValue("location", type)
                                }
                                {...getFieldProps("location")}
                                location={values.location}
                                error={getFieldError("location")}
                            />
                            <TaskCurrency
                                value={
                                    taskDetail
                                        ? taskDetail?.currency?.code?.toString()
                                        : ""
                                }
                                data={
                                    taskDetail?.currency
                                        ? [
                                              {
                                                  label: taskDetail?.currency
                                                      ?.name,
                                                  value: taskDetail?.currency?.code.toString(),
                                              },
                                          ]
                                        : []
                                }
                                onCurrencyChange={(currencyId) =>
                                    setFieldValue("currency", currencyId)
                                }
                                error={getFieldError("currency")}
                            />
                            <TaskBudget
                                initialBudgetFrom={taskDetail?.budget_from}
                                initialBudgetTo={taskDetail?.budget_to}
                                {...formik}
                            />
                            <Checkbox
                                defaultChecked={taskDetail?.is_negotiable}
                                label="Yes, it is negotiable."
                                {...getFieldProps("is_negotiable")}
                            />
                            <Stack sx={{ maxWidth: "40rem" }}>
                                <Title order={6}>Images</Title>
                                <Text color="dimmed" size="sm">
                                    Including images helps you find best
                                    merchant for your task.
                                </Text>
                                <CustomDropZone
                                    //  accept={IMAGE_MIME_TYPE}
                                    accept={{
                                        "image/*": [], // All images
                                    }}
                                    uploadedFiles={taskDetail?.images ?? []}
                                    fileType="image"
                                    sx={{ maxWidth: "30rem" }}
                                    maxSize={5 * 1024 ** 2}
                                    name="task-image"
                                    onRemoveUploadedFiles={setInitialImageIds}
                                    onDrop={(images) =>
                                        setFieldValue("images", images)
                                    }
                                />
                            </Stack>
                            <Stack sx={{ maxWidth: "40rem" }}>
                                <Title order={6}>Videos</Title>
                                <Text color="dimmed" size="sm">
                                    Including images or videos helps you find
                                    best merchant for your task.
                                </Text>
                                <CustomDropZone
                                    accept={[MIME_TYPES.mp4]}
                                    uploadedFiles={taskDetail?.videos ?? []}
                                    fileType="video"
                                    name="task-video"
                                    maxSize={100 * 1024 ** 2}
                                    onRemoveUploadedFiles={setInitialVideoIds}
                                    onDrop={(videos) =>
                                        setFieldValue("videos", videos)
                                    }
                                />
                            </Stack>
                            <Checkbox
                                label="is active"
                                name="is_active"
                                defaultChecked={true}
                                onChange={(event) =>
                                    setFieldValue(
                                        "is_active",
                                        event.currentTarget.checked
                                    )
                                }
                            />
                            {/* <TaskDate setFieldValue={setFieldValue} /> */}
                            <Checkbox
                                checked={termsAccepted}
                                onChange={(event) =>
                                    setTermsAccepted(event.target.checked)
                                }
                                label={
                                    <Text>
                                        Accept all{" "}
                                        <Link
                                            passHref
                                            href="/terms-and-conditions"
                                        >
                                            <Anchor>
                                                Terms and Conditions
                                            </Anchor>
                                        </Link>
                                    </Text>
                                }
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "1rem",
                                }}
                            >
                                <Button
                                    onClick={handleCloseModal}
                                    className="close-btn close-btn-mod btn p-3 h-25"
                                >
                                    Cancel
                                </Button>
                                <BigButton
                                    type="submit"
                                    className="close-btn btn p-3 h-25 text-white"
                                    btnTitle="Post Task"
                                    backgroundColor="#211D4F"
                                />
                            </Box>
                        </Stack>
                    </form>
                ) : (
                    <AddServiceModalComponent />
                )}
            </Modal>
        </>
    );
};
