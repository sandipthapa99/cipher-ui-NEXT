import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

interface DeleteModalProps {
    show?: boolean;
    handleClose?: () => void;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    id?: number;
}

const DeleteReplyModal = ({
    show,
    handleClose,
    id,
    setShowDeleteModal,
}: DeleteModalProps) => {
    const queryClient = useQueryClient();

    const replyMutation = useMutation((data) =>
        axiosClient.patch(`task/rating/delete-reply/${id}/`)
    );

    const { handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            reply: "",
        },

        onSubmit: (values: any) => {
            console.log(
                "🚀 ~ file: DeleteReplyModal.tsx ~ line 35 ~ newValues",
                values
            );

            replyMutation.mutate(values, {
                onSuccess: () => {
                    toast.success("Replied successfully");
                    queryClient.invalidateQueries(["tasker-rating"]);
                    setShowDeleteModal(false);
                },
                onError: (err: any) => {
                    toast.error(err.message);
                    setShowDeleteModal(false);
                },
            });
        },
    });
    return (
        <div className="share-modal delete-modal">
            {/* Modal component */}
            <Modal centered show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal share-modal__modal-body-content">
                    <h3>Are you sure you want to delete your reply?</h3>

                    <Modal.Footer>
                        <Button
                            className="btn close-btn"
                            variant="secondary"
                            onClick={handleClose}
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => handleSubmit()}
                            variant="primary"
                        >
                            Yes
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
};
export default DeleteReplyModal;
