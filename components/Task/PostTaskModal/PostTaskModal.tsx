import BigButton from "@components/common/Button";
import { CustomDropZone } from "@components/common/CustomDropZone";
import { postTaskSchema } from "@components/Task/PostTaskModal/postTaskSchema";
import type { TaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { SelectTaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { BudgetType } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskBudget } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskCategory } from "@components/Task/PostTaskModal/TaskCategory";
import { TaskCurrency } from "@components/Task/PostTaskModal/TaskCurrency";
import { TaskDate } from "@components/Task/PostTaskModal/TaskDate";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
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
import { useFormik } from "formik";
import { usePostTask } from "hooks/task/use-post-task";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {
    useShowPostTaskModal,
    useToggleShowPostTaskModal,
} from "store/use-show-post-task";

export interface PostTaskPayload {
    title: string;
    description: string;
    requirements: string;
    category: string;
    location: TaskType;
    currency: string;
    budget_type: BudgetType;
    budget_from: string;
    budget_to: string;
    is_negotiable: boolean;
    image: string;
    video: string;
    estimated_time: number;
    is_recursion: boolean;
    is_everyday: boolean;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
}

export const PostTaskModal = () => {
    const { mutate } = usePostTask();
    const showPostTaskModal = useShowPostTaskModal();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();

    const { getFieldProps, handleSubmit, touched, errors, setFieldValue } =
        useFormik<PostTaskPayload>({
            initialValues: {
                title: "",
                description: "",
                requirements: "",
                category: "",
                location: "remote",
                budget_type: BudgetType.FIXED,
                budget_from: "",
                budget_to: "",
                is_negotiable: false,
                image: "",
                video: "",
                estimated_time: 5,
                is_recursion: false,
                is_everyday: false,
                start_date: "2022-12-01",
                end_date: "2023-01-04",
                start_time: "01:00",
                end_time: "03:00",
                currency: "",
            },
            validationSchema: postTaskSchema,
            onSubmit: (values) => {
                const formData = new FormData();
                Object.entries(values).forEach((tempValue) => {
                    const [key, value] = tempValue;
                    if (key !== "video" && key !== "image") {
                        formData.append(key, value.toString());
                    }
                });
                formData.append("video", values.video);
                formData.append("image", values.image);
                mutate(formData, {
                    onSuccess: (payload) => {
                        toggleShowPostTaskModal();
                        toast.success(payload.message);
                    },
                    onError: (error) => {
                        toast.error(error.message);
                    },
                });
            },
        });
    const getFieldError = (fieldName: keyof PostTaskPayload) =>
        touched[fieldName] && errors[fieldName]
            ? errors[fieldName]?.toString()
            : null;

    return (
        <Modal
            overflow="outside"
            overlayOpacity={0.65}
            overlayBlur={3}
            opened={showPostTaskModal}
            onClose={toggleShowPostTaskModal}
            title="Post a Task"
            size="xl"
        >
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
                        onRequirementsChange={(requirements) =>
                            setFieldValue(
                                "requirements",
                                JSON.stringify(requirements)
                            )
                        }
                        error={getFieldError("requirements")}
                        {...getFieldProps("requirements")}
                    />
                    <TaskCurrency
                        onCurrencyChange={(currencyId) =>
                            setFieldValue("currency", currencyId)
                        }
                        error={getFieldError("currency")}
                    />
                    <TaskCategory
                        onCategoryChange={(category) =>
                            setFieldValue("category", category)
                        }
                        {...getFieldProps("category")}
                        error={getFieldError("category")}
                    />
                    <SelectTaskType
                        onTypeChange={(type) => setFieldValue("location", type)}
                        {...getFieldProps("location")}
                        error={getFieldError("location")}
                    />
                    <TaskBudget
                        budgetFromError={getFieldError("budget_from")}
                        budgetToError={getFieldError("budget_to")}
                        budgetTypeError={getFieldError("budget_type")}
                        setFieldValue={setFieldValue}
                        getFieldProps={getFieldProps}
                    />
                    <Checkbox
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
                            fileLabel="Image"
                            sx={{ maxWidth: "30rem" }}
                            name="task-image"
                            onDrop={(formData) =>
                                setFieldValue(
                                    "image",
                                    formData.get("task-image")
                                )
                            }
                            type={["image"]}
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
                            fileLabel="Video"
                            sx={{ maxWidth: "30rem" }}
                            name="task-video"
                            onDrop={(formData) =>
                                setFieldValue(
                                    "video",
                                    formData.get("task-video")
                                )
                            }
                            type={["video"]}
                        />
                    </Stack>
                    <TaskDate setFieldValue={setFieldValue} />
                    <Checkbox
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
                            onClick={toggleShowPostTaskModal}
                            className="close-btn close-btn-mod btn p-3 h-25 w-25"
                        >
                            Cancel
                        </Button>
                        <BigButton
                            type="submit"
                            className="close-btn btn p-3 h-25 w-25"
                            btnTitle="Post Task"
                            backgroundColor="#211D4F"
                        />
                    </Box>
                </Stack>
            </form>
        </Modal>
    );
};
