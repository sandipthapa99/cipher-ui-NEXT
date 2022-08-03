import {
    faEyeSlash,
    faPencil,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import Dropdown from "react-bootstrap/Dropdown";

interface DropdownProps {
    children?: ReactNode;
}

const EllipsisDropdown = ({ children }: DropdownProps) => {
    return (
        <div className="ellipsis">
            <Dropdown>
                <Dropdown.Toggle>{children && <>{children}</>}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                        <FontAwesomeIcon className="svg-icon" icon={faPencil} />
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faTrashCan}
                        />
                        Remove
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faEyeSlash}
                        />
                        Inactive
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
export default EllipsisDropdown;
