import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useDeleteData } from "hooks/use-delete";
import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

interface DeleteModalProps {
    show?: boolean;
    handleClose?: () => void;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    id?: number;
    modalName?: string;
}

const DeleteModal = ({
    show,
    handleClose,
    id,
    setShowDeleteModal,
    modalName,
}: DeleteModalProps) => {
    const queryClient = useQueryClient();

    const { mutate } = useDeleteData(`/tasker/${modalName}/${id}/`);

    return (
        <Fragment>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Are you sure you want to delete?</h3>
                </div>
                <Modal.Footer>
                    <Button variant="secondary">No</Button>
                    <Button
                        onClick={() => {
                            mutate(id, {
                                onSuccess: async () => {
                                    setShowDeleteModal(false);
                                    toast.success(
                                        `${modalName?.toUpperCase()} detail deleted successfully`
                                    );
                                    queryClient.invalidateQueries([
                                        `tasker-${modalName}`,
                                    ]);
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            });
                        }}
                        variant="primary"
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};
export default DeleteModal;
