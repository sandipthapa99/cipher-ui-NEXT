import {
    faEyeSlash,
    faGear,
    faPencil,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import type { ReactNode } from "react";
import Dropdown from "react-bootstrap/Dropdown";
interface menu {
    item: string;
    onClick: string;
    redirectTo?: string;
}
interface DropdownProps {
    children?: ReactNode;
    showModal?: boolean;
    menu?: menu[];
    handleOnClick?: () => void;
}
const EllipsisDropdown = ({ children, handleOnClick, menu }: DropdownProps) => {
    return (
        <div className="ellipsis">
            <Dropdown>
                <Dropdown.Toggle>{children && <>{children}</>}</Dropdown.Toggle>
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
                                                        : item.item === "Delete"
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
                                                    : item.item === "Settings"
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
                                href="#/action-1"
                                onClick={handleOnClick}
                                className="d-flex align-items-center"
                            >
                                <FontAwesomeIcon
                                    className="svg-icon"
                                    icon={faPencil}
                                />
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#/action-2"
                                className="d-flex align-items-center"
                            >
                                <FontAwesomeIcon
                                    className="svg-icon"
                                    icon={faTrashCan}
                                />
                                Remove
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="#/action-3"
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
    );
};
export default EllipsisDropdown;
