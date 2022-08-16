import { faFolderOpen } from "@fortawesome/pro-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { PostCard } from "./PostCard";
import PostModal from "./PostModal";

const Post = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    return (
        <>
            <div className="apply-post">
                <div className="folder">
                    <FontAwesomeIcon
                        icon={faFolderOpen}
                        className="folder-icon"
                    />
                </div>
                <div className="text-post">
                    <p className="head">No active Task posts</p>
                    <p className="para">
                        Post a task to the marketplace and let merchant come to
                        you.
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
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};

export default Post;
