import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import { toast } from "utils/toast";

import AddBank from "./bankDetail";
import BankForm from "./bankDetail";

interface BankDetailModalProps {
    show?: boolean;
    handleClose?: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}

const BankDetailModal = ({
    handleClose,
    show,
    setShowForm,
}: BankDetailModalProps) => {
    const router = useRouter();

    return (
        <>
            {/* Modal component */}
            <Modal
                show={show}
                centered
                onHide={handleClose}
                className="auth-modal bank-modal"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title>Bank Details</Modal.Title> */}
                </Modal.Header>
                <div className="modal-body-cntent">
                    <BankForm showBankForm={true} showPrimaryBank={false} />
                    <Modal.Footer>
                        <Button className="btn close-btn" onClick={handleClose}>
                            Cancel
                        </Button>
                        {/* <Button className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </Button> */}
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};
export default BankDetailModal;
