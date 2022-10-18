import {
    faEyeSlash,
    faGear,
    faPencil,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteTask } from "hooks/task/use-delete-task";
import Link from "next/link";
import type { ReactNode } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSetEditTaskDetail } from "store/use-edit-task";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import { ReactQueryKeys } from "types/queryKeys";
import type { ITask } from "types/task";
import { toast } from "utils/toast";
interface Menu {
    item: string;
    onClick: string;
    redirectTo?: string;
}
interface DropdownProps {
    children?: ReactNode;
    showModal?: boolean;
    menu?: Menu[];
    task?: ITask;
    handleOnClick?: () => void;
}
const EllipsisDropdown = ({
    children,
    handleOnClick,
    menu,
    task,
}: DropdownProps) => {
    const modals = useModals();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const setEditTaskDetail = useSetEditTaskDetail();

    const queryClient = useQueryClient();
    const { mutate: deleteTaskMutation } = useDeleteTask();

    const handleDeleteTask = () => {
        if (!task) return;
        deleteTaskMutation(
            { id: task.id },
            {
                onSuccess: (message) => {
                    toast.success(message);
                    queryClient.invalidateQueries([ReactQueryKeys.TASKS]);
                },
            }
        );
    };

    const openConfirmDeleteTaskModal = () =>
        modals.openConfirmModal({
            title: `Delete`,
            centered: true,
            labels: { confirm: `Delete`, cancel: "Cancel" },
            confirmProps: { color: "red" },
            children: <Text>Are you sure you want to delete this task ?</Text>,
            onConfirm: handleDeleteTask,
        });

    return (
        <>
            <div className="ellipsis">
                <Dropdown>
                    <Dropdown.Toggle>
                        {children && <>{children}</>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {menu ? (
                            menu.map((item, i) => (
                                <Dropdown.Item
                                    key={i}
                                    href="#/action-1"
                                    onClick={handleOnClick}
                                    className="d-flex align-items-center"
                                >
                                    {item.redirectTo ? (
                                        <Link href={`/${item.redirectTo}`}>
                                            <a>
                                                <FontAwesomeIcon
                                                    className="svg-icon"
                                                    icon={
                                                        item.item === "Edit"
                                                            ? faPencil
                                                            : item.item ===
                                                              "Settings"
                                                            ? faGear
                                                            : item.item ===
                                                              "Delete"
                                                            ? faTrashCan
                                                            : faEyeSlash
                                                    }
                                                />
                                                {item.item}
                                            </a>
                                        </Link>
                                    ) : (
                                        <div>
                                            <FontAwesomeIcon
                                                className="svg-icon"
                                                icon={
                                                    item.item === "Edit"
                                                        ? faPencil
                                                        : item.item ===
                                                          "Settings"
                                                        ? faGear
                                                        : item.item === "Delete"
                                                        ? faTrashCan
                                                        : faEyeSlash
                                                }
                                            />
                                            {item.item}
                                        </div>
                                    )}
                                </Dropdown.Item>
                            ))
                        ) : (
                            <>
                                <Dropdown.Item
                                    onClick={() => {
                                        toggleShowPostTaskModal("EDIT");
                                        setEditTaskDetail(task);
                                    }}
                                    className="d-flex align-items-center"
                                >
                                    <FontAwesomeIcon
                                        className="svg-icon"
                                        icon={faPencil}
                                    />
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                    className="d-flex align-items-center"
                                    onClick={openConfirmDeleteTaskModal}
                                >
                                    <FontAwesomeIcon
                                        className="svg-icon"
                                        icon={faTrashCan}
                                    />
                                    Remove
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
};
export default EllipsisDropdown;
