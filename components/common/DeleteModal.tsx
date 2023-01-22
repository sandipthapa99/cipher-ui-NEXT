import { faXmarkCircle } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteData } from "hooks/use-delete";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "utils/toast";

import CardBtn from "./CardBtn";

interface DeleteModalProps {
    show: boolean;
    handleClose: () => void;
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
        <>
            <Modal
                opened={show}
                onClose={handleClose}
                centered
                withCloseButton={false}
                closeOnClickOutside={false}
                // overlayColor="909296"
                overlayOpacity={0.55}
                overlayBlur={3}
                size="md"
                className="delete-modal"
            >
                <div className="content d-flex align-items-center justify-content-center flex-column">
                    <div className="icon-block">
                        <FontAwesomeIcon
                            icon={faXmarkCircle}
                            className="xmark-icon"
                        />
                    </div>
                    <h1>Are you sure?</h1>
                    <p>
                        Do you really want to delete this record? This process
                        cannot be undone.
                    </p>
                    <div className="btn-group">
                        <CardBtn
                            backgroundColor="#C1C1C1"
                            btnTitle="Cancel"
                            handleClick={handleClose}
                        />
                        <CardBtn
                            backgroundColor="#F15E5E"
                            btnTitle="Delete"
                            handleClick={() => {
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
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default DeleteModal;
