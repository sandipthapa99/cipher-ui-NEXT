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
    Anchor,
    Box,
    Checkbox,
    LoadingOverlay,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { usePostTask } from "hooks/task/use-post-task";
import { useUploadFile } from "hooks/use-upload-file";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import {
    usePostTaskModalType,
    useShowPostTaskModal,
    useToggleShowPostTaskModal,
} from "store/use-show-post-task";
import { useToggleSuccessModal } from "store/use-success-modal";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITask } from "types/task";
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
    budget_from: number | string | null;
    budget_to: number | string;
    is_negotiable: boolean;
    images: string;
    videos: string;
    estimated_time: number;
    is_recursion: boolean;
    is_requested: boolean;
    is_everyday: boolean;
    is_active: boolean;
    share_location: boolean;
}

export const AddServiceModalComponent = () => {
    const [choosedValue, setChoosedValue] = useState("task");
    const toggleSuccessModal = useToggleSuccessModal();
    const queryClient = useQueryClient();
    const { mutate: createTaskMutation, isLoading: createTaskLoading } =
        usePostTask();
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

    const createServiceLoading = createTaskLoading || uploadFileLoading;

    const initialHighlights = safeParse({
        rawString: taskDetail?.highlights ?? "",
        initialData: [],
    });
    const formik = useFormik<PostTaskPayload>({
        initialValues: {
            title: taskDetail ? taskDetail.title : "",
            description: taskDetail ? taskDetail.description : "",
            highlights: initialHighlights,
            city: "",
            location: "remote",
            budget_type: "Project",
            budget_from: null,
            budget_to: "",
            service: "",
            is_negotiable: false,
            estimated_time: 5,
            is_recursion: false,
            is_requested: false,
            is_everyday: false,
            // start_date: "",
            // end_date: "",
            // start_time: "",
            // end_time: "",
            currency: "113",
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
                highlights: values.highlights,
                images: imageIds,
                videos: videoIds,
                extra_data: [],
            };

            createTaskMutation(postTaskPayload, {
                onSuccess: async (task) => {
                    handleCloseModal();
                    action.resetForm();
                    toggleSuccessModal("Service successfully posted");
                    // toast.success(message);
                    await queryClient.invalidateQueries([ReactQueryKeys.TASKS]);
                    await queryClient.invalidateQueries(["notification"]);
                    router.push(`/service/${task.id}`);
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
    const isCreateTaskLoading = createTaskLoading || uploadFileLoading;
    return (
        <>
            <LoadingOverlay
                visible={isCreateTaskLoading}
                sx={{ position: "fixed", inset: 0 }}
            />

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
                        value={values?.description ?? ""}
                        onChange={(value) =>
                            setFieldValue("description", value)
                        }
                        placeholder="Enter your description"
                    />
                    <TaskRequirements
                        initialRequirements={initialHighlights}
                        onRequirementsChange={(requirements) =>
                            setFieldValue("highlights", requirements)
                        }
                        error={getFieldError("highlights")}
                        {...getFieldProps("highlights")}
                        labelName="Highlights"
                        description="This helps clients to find about your service highlights"
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
                        onCitySelect={(cityId) => setFieldValue("city", cityId)}
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
                        location={values.location}
                        setFieldValue={setFieldValue}
                        onTypeChange={(type) => setFieldValue("location", type)}
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
                            Including images helps you find best merchant for
                            your task.
                        </Text>
                        <CustomDropZone
                            accept={IMAGE_MIME_TYPE}
                            fileType="image"
                            sx={{ maxWidth: "30rem" }}
                            name="task-image"
                            onDrop={(images) => setFieldValue("images", images)}
                        />
                    </Stack>
                    <Stack sx={{ maxWidth: "40rem" }}>
                        <Title order={6}>Videos</Title>
                        <Text color="dimmed" size="sm">
                            Including images or videos helps you find best
                            merchant for your task.
                        </Text>
                        <CustomDropZone
                            accept={[MIME_TYPES.mp4]}
                            fileType="video"
                            name="task-video"
                            onDrop={(videos) => setFieldValue("videos", videos)}
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
                                <Link passHref href="/terms-and-conditions">
                                    <Anchor>Terms and Conditions</Anchor>
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
                            btnTitle="Post Service"
                            backgroundColor="#211D4F"
                        />
                    </Box>
                </Stack>
            </form>
        </>
    );
};
