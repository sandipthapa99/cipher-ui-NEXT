import { ConfirmDeactiveTaskModal } from "@components/Task/ConfirmDeactiveTaskModal";
import { ConfirmDeleteTaskModal } from "@components/Task/ConfirmDeleteTaskModal";
import {
    faEyeSlash,
    faGear,
    faPencil,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToggle } from "@mantine/hooks";
import Link from "next/link";
import type { ReactNode } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSetEditTaskDetail } from "store/use-edit-task";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import type { ITask } from "types/task";
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
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const [deleteModalOpened, toggleDeleteModalOpened] = useToggle([
        false,
        true,
    ]);
    const [deactiveModalOpened, toggleDeactiveModalOpened] = useToggle([
        false,
        true,
    ]);
    const setEditTaskDetail = useSetEditTaskDetail();

    return (
        <>
            {task && (
                <>
                    <ConfirmDeleteTaskModal
                        task={task}
                        opened={deleteModalOpened}
                        onClose={toggleDeleteModalOpened}
                    />
                    <ConfirmDeactiveTaskModal
                        task={task}
                        opened={deactiveModalOpened}
                        onClose={toggleDeactiveModalOpened}
                    />
                </>
            )}
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
                                    onClick={() => toggleDeleteModalOpened()}
                                >
                                    <FontAwesomeIcon
                                        className="svg-icon"
                                        icon={faTrashCan}
                                    />
                                    Remove
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => toggleDeactiveModalOpened()}
                                    className="d-flex align-items-center"
                                >
                                    <FontAwesomeIcon
                                        className="svg-icon"
                                        icon={faEyeSlash}
                                    />
                                    Inactive
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
