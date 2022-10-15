import type { ModalProps } from "@mantine/core";
import { Space } from "@mantine/core";
import { Group } from "@mantine/core";
import { Highlight } from "@mantine/core";
import { Button, Modal } from "@mantine/core";
import { useDeleteTask } from "hooks/task/use-delete-task";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import type { ITask } from "types/task";

interface ConfirmDeleteTaskModalProps extends ModalProps {
    task: ITask;
}

export const ConfirmDeleteTaskModal = ({
    onClose,
    task,
    ...rest
}: ConfirmDeleteTaskModalProps) => {
    const router = useRouter();
    const { mutate: deleteTaskMutation, isLoading } = useDeleteTask();
    const handleDeleteTask = () => {
        deleteTaskMutation(
            { id: task.id },
            {
                onSuccess: (message) => {
                    onClose();
                    toast.success(message);
                    router.push("/task");
                },
            }
        );
    };
    return (
        <Modal title="Delete task" onClose={onClose} {...rest}>
            <Highlight
                highlightColor="red"
                highlightStyles={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                size="sm"
                highlight={task.title}
            >
                {`Are you sure you want to delete ${task.title} ?`}
            </Highlight>
            <Space h="md" />
            <Group position="right">
                <Button onClick={() => onClose()} variant="white">
                    Cancel
                </Button>
                <Button
                    loading={isLoading}
                    onClick={handleDeleteTask}
                    color="red"
                >
                    Confirm
                </Button>
            </Group>
        </Modal>
    );
};
