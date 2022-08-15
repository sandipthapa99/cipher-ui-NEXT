import PostModal from "@components/PostTask/PostModal";
import { faFolderOpen } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ApplyPostComponent = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div className="apply-post">
            <div className="folder">
                <FontAwesomeIcon icon={faFolderOpen} className="folder-icon" />
            </div>
            <div className="text-post">
                <p className="head">No active Task posts</p>
                <p className="para">
                    Post a task to the marketplace and let merchant come to you.
                </p>
            </div>
            <div className="btn-cont">
                <Button
                    variant="light"
                    className="post-btn"
                    onClick={handleShow}
                >
                    Post a Task
                </Button>
            </div>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                className="post-modal"
            >
                <Modal.Header className="mt-4" closeButton></Modal.Header>
                <Modal.Body>
                    <PostModal setshowPostModel={handleClose} />
                </Modal.Body>
            </Modal>
        </div>
    );
};
