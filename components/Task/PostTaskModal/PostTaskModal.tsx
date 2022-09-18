import { AddServiceModalComponent } from "@components/AddServices/AddServiceModalComponent";
import BigButton from "@components/common/Button";
import { CustomDropZone } from "@components/common/CustomDropZone";
import { postTaskSchema } from "@components/Task/PostTaskModal/postTaskSchema";
import { SelectCity } from "@components/Task/PostTaskModal/SelectCity";
import type { TaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { SelectTaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { ServiceOptions } from "@components/Task/PostTaskModal/ServiceOptions";
import { BudgetType } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskBudget } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskCurrency } from "@components/Task/PostTaskModal/TaskCurrency";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import { LoadingOverlay, Radio } from "@mantine/core";
import {
    Anchor,
    Box,
    Checkbox,
    Modal,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useEditTask } from "hooks/task/use-edit-task";
import { usePostTask } from "hooks/task/use-post-task";
import { useUploadFile } from "hooks/use-upload-file";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    usePostTaskModalType,
    useShowPostTaskModal,
    useToggleShowPostTaskModal,
} from "store/use-show-post-task";
import type { ITask } from "types/task";

export interface PostTaskPayload {
    title: string;
    description: string;
    highlights: Record<string, string>;
    service: string;
    city: string;
    location: TaskType;
    currency: string;
    budget_type: BudgetType;
    budget_from: number;
    budget_to: number;
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
}

export const PostTaskModal = () => {
    const [choosedValue, setChoosedValue] = useState("task");
    const queryClient = useQueryClient();
    const { mutate: createTaskMutation, isLoading: createTaskLoading } =
        usePostTask();
    const { mutate: editTaskMutation, isLoading: editTaskLoading } =
        useEditTask();
    const showPostTaskModalType = usePostTaskModalType();
    const showPostTaskModal = useShowPostTaskModal();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const router = useRouter();

    const taskSlug = router.query?.slug;
    const taskDetail =
        showPostTaskModalType === "EDIT"
            ? queryClient.getQueryData<ITask>(["task-detail", taskSlug])
            : undefined;

    const [termsAccepted, setTermsAccepted] = useState(true);
    const { mutateAsync: uploadFileMutation, isLoading: uploadFileLoading } =
        useUploadFile();

    const formik = useFormik<PostTaskPayload>({
        initialValues: {
            title: taskDetail ? taskDetail.title : "",
            description: taskDetail ? taskDetail.description : "",
            highlights: taskDetail ? taskDetail.highlights : {},
            city: "",
            location: "remote",
            budget_type: BudgetType.FIXED,
            budget_from: 0,
            budget_to: 0,
            service: "",
            is_negotiable: false,
            estimated_time: 5,
            is_recursion: false,
            is_requested: true,
            is_everyday: false,
            start_date: "2022-12-01",
            end_date: "2023-01-04",
            start_time: "01:00",
            end_time: "03:00",
            currency: "",
            images: "",
            videos: "",
            is_active: true,
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
            const imageIds = await uploadFileMutation({
                files: values.images,
                media_type: "image",
            });
            const videoIds = await uploadFileMutation({
                files: values.videos,
                media_type: "video",
            });
            const postTaskPayload = {
                ...values,
                images: imageIds,
                videos: videoIds,
                extra_data: [],
            };

            if (showPostTaskModalType === "EDIT" && taskDetail) {
                editTaskMutation(
                    { id: taskDetail.id, data: postTaskPayload },
                    {
                        onSuccess: async (message) => {
                            handleCloseModal();
                            await queryClient.invalidateQueries([
                                "task-detail",
                                taskSlug,
                            ]);
                            toast.success(message);
                        },
                    }
                );
                return;
            }
            createTaskMutation(postTaskPayload, {
                onSuccess: async ({ message }) => {
                    handleCloseModal();
                    action.resetForm();
                    // toast.success(message);
                    await queryClient.invalidateQueries(["all-tasks"]);
                    await queryClient.invalidateQueries(["notification"]);
                    // router.push({ pathname: "/task" });
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            });
        },
    });

    const {
        getFieldProps,
        handleSubmit,
        touched,
        errors,
        values,
        setFieldValue,
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
                overlayColor="rgba(0, 0, 0, 0.25)"
                title="Post a Task or Service"
                size="xl"
            >
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
                            <Textarea
                                label="Task Description"
                                placeholder="Enter your description"
                                minRows={5}
                                required
                                {...getFieldProps("description")}
                                error={getFieldError("description")}
                            />
                            <TaskRequirements
                                initialRequirements={
                                    taskDetail?.highlights ?? {}
                                }
                                onRequirementsChange={(requirements) =>
                                    setFieldValue("highlights", requirements)
                                }
                                error={getFieldError("highlights")}
                                {...getFieldProps("highlights")}
                            />
                            <TaskCurrency
                                value={
                                    taskDetail
                                        ? taskDetail?.currency?.id?.toString()
                                        : ""
                                }
                                onCurrencyChange={(currencyId) =>
                                    setFieldValue("currency", currencyId)
                                }
                                error={getFieldError("currency")}
                            />
                            <SelectCity
                                onCitySelect={(cityId) =>
                                    setFieldValue("city", cityId)
                                }
                            />

                            <ServiceOptions
                                {...getFieldProps("service")}
                                onServiceChange={(service) =>
                                    setFieldValue("service", service)
                                }
                                error={getFieldError("service")}
                                value={
                                    taskDetail
                                        ? taskDetail?.category?.id?.toString()
                                        : ""
                                }
                            />
                            <SelectTaskType
                                setFieldValue={setFieldValue}
                                onTypeChange={(type) =>
                                    setFieldValue("location", type)
                                }
                                {...getFieldProps("location")}
                                error={getFieldError("location")}
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
                                    accept={IMAGE_MIME_TYPE}
                                    fileType="image"
                                    sx={{ maxWidth: "30rem" }}
                                    name="task-image"
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
                                    fileType="video"
                                    name="task-video"
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
                    <AddServiceModalComponent handleClose={handleCloseModal} />
                )}
            </Modal>
        </>
    );
};
