import PostModal from "@components/PostTask/PostModal";
import {
    faEyeSlash,
    faPencil,
    faTrashCan,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

interface DropdownProps {
    children?: ReactNode;
}

const EllipsisDropdown = ({ children }: DropdownProps) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="ellipsis">
            <Dropdown>
                <Dropdown.Toggle>{children && <>{children}</>}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={handleShow}>
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

            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                className="post-modal"
            >
                <Modal.Header className="mt-4" closeButton></Modal.Header>
                <Modal.Body>
                    <PostModal onSubmit={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default EllipsisDropdown;
