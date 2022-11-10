import { faPencil, faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import Dropdown from "react-bootstrap/Dropdown";

interface DropdownProps {
    children?: ReactNode;
    handleEdit?: () => void;
    handleDelete?: () => void;
    handleInactive?: () => void;
}
const EllipsisDropdownService = ({
    children,
    handleEdit,
    handleDelete,
    handleInactive,
}: DropdownProps) => {
    return (
        <div className="ellipsis">
            <Dropdown>
                <Dropdown.Toggle>
                    <Dropdown.Toggle>
                        {children && <>{children}</>}
                    </Dropdown.Toggle>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        className="d-flex align-items-center"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon className="svg-icon" icon={faPencil} />
                        Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                        className="d-flex align-items-center"
                        onClick={handleDelete}
                    >
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faTrashCan}
                        />
                        Remove
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                        className="d-flex align-items-center"
                        onClick={handleInactive}
                    >
                        <FontAwesomeIcon
                            className="svg-icon"
                            icon={faEyeSlash}
                        />
                        Inactive
                    </Dropdown.Item> */}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
export default EllipsisDropdownService;
