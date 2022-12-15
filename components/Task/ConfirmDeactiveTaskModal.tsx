import type { ModalProps } from "@mantine/core";
import { Button } from "@mantine/core";
import { Group } from "@mantine/core";
import { Highlight, Modal } from "@mantine/core";
import { useDeactivateTask } from "hooks/task/use-deactivate-task";
import { useRouter } from "next/router";
import type { ITask } from "types/task";
import { toast } from "utils/toast";

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
        <Modal
            title="Deactive task"
            onClose={onClose}
            {...rest}
            overlayOpacity={0.55}
            overlayBlur={3}
        >
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
