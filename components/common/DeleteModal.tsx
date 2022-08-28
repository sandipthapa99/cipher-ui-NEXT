import { useQueryClient } from "@tanstack/react-query";
import { useDeleteData } from "hooks/use-delete";
import type { Dispatch, SetStateAction } from "react";
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
        <div className="share-modal">
            {/* Modal component */}
            <Modal centered show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal share-modal__modal-body-content">
                    <h3>Are you sure you want to delete your {modalName}?</h3>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                mutate(id, {
                                    onSuccess: async () => {
                                        setShowDeleteModal(false);
                                        toast.success(
                                            `${modalName} detail deleted successfully`
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
                </div>
            </Modal>
        </div>
    );
};
export default DeleteModal;
