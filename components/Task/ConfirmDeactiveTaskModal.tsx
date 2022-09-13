import type { ModalProps } from "@mantine/core";
import { Blockquote } from "@mantine/core";
import { Button, Text } from "@mantine/core";
import { Group } from "@mantine/core";
import { Highlight, Modal } from "@mantine/core";
import { useDeactivateTask } from "hooks/task/use-deactivate-task";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import type { ITask } from "types/task";

interface ConfirmDeactiveTaskModalProps extends ModalProps {
    task: ITask;
}
export const ConfirmDeactiveTaskModal = ({
    task,
    onClose,
    ...rest
}: ConfirmDeactiveTaskModalProps) => {
    const router = useRouter();
    const { mutate: deactivateTaskMutation, isLoading } = useDeactivateTask();

    const handleDeactivateTask = () => {
        deactivateTaskMutation(
            { id: task.id },
            {
                onSuccess: (message) => {
                    onClose();
                    router.push("/task");
                    toast.success(message);
                },
            }
        );
    };
    return (
        <Modal title="Deactive task" onClose={onClose} {...rest}>
            <Highlight
                highlightColor="red"
                highlightStyles={() => ({
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                })}
                size="sm"
                highlight={task.title}
            >
                {`Are you sure you want to deactivate ${task.title} ?`}
            </Highlight>
            <Group position="right">
                <Button variant="white" onClick={() => onClose()}>
                    Cancel
                </Button>
                <Button
                    loading={isLoading}
                    color="red"
                    onClick={handleDeactivateTask}
                >
                    Confirm
                </Button>
            </Group>
        </Modal>
    );
};
