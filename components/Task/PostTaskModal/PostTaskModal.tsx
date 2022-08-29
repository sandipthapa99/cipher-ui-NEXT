import { CustomDropZone } from "@components/common/CustomDropZone";
import { SelectTaskType } from "@components/Task/PostTaskModal/SelectTaskType";
import { TaskBudget } from "@components/Task/PostTaskModal/TaskBudget";
import { TaskCategory } from "@components/Task/PostTaskModal/TaskCategory";
import { TaskDate } from "@components/Task/PostTaskModal/TaskDate";
import { TaskRequirements } from "@components/Task/PostTaskModal/TaskRequirements";
import { Modal, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import {
    useShowPostTaskModal,
    useToggleShowPostTaskModal,
} from "store/use-show-post-task";

export const PostTaskModal = () => {
    const showPostTaskModal = useShowPostTaskModal();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();

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
            <Stack spacing="md">
                <TextInput
                    data-autoFocus
                    placeholder="Need a garden cleaner"
                    label="Title"
                    required
                />
                <Textarea
                    label="Task Description"
                    placeholder="Need a garden cleaner to clean my garden and remove the weeds"
                    minRows={5}
                    required
                />
                <TaskRequirements
                    onRequirementsChange={(requirements) =>
                        console.log(requirements)
                    }
                />
                <TaskCategory
                    onCategoryChange={(category) => console.log(category)}
                />
                <SelectTaskType onTypeChange={(type) => console.log(type)} />
                <TaskBudget />
                <Stack sx={{ maxWidth: "40rem" }}>
                    <Title order={6}>Images</Title>
                    <Text color="dimmed" size="sm">
                        Including images helps you find best merchant for your
                        task.
                    </Text>
                    <CustomDropZone
                        fileType="image"
                        sx={{ maxWidth: "30rem" }}
                        name="task-image"
                        onDrop={(formData) =>
                            console.log(formData.get("task-image"))
                        }
                    />
                </Stack>
                <Stack sx={{ maxWidth: "40rem" }}>
                    <Title order={6}>Videos</Title>
                    <Text color="dimmed" size="sm">
                        Including images or videos helps you find best merchant
                        for your task.
                    </Text>
                    <CustomDropZone
                        fileType="video"
                        sx={{ maxWidth: "30rem" }}
                        name="task-image"
                        onDrop={(formData) =>
                            console.log(formData.get("task-image"))
                        }
                    />
                </Stack>
                <TaskDate />
            </Stack>
        </Modal>
    );
};
