import BigButton from "@components/common/Button";
import { useForm } from "hooks/use-form";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";

interface ProfileSuccessModalCardProps {
    show?: boolean;
    onClick: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
    handleClose?: () => void;
}

const ProfileSuccessModalCard = ({
    show,
    setShowForm,
    handleClose,

    onClick,
}: ProfileSuccessModalCardProps) => {
    const router = useRouter();

    const handleCloseModal = () => {
        setShowForm(false);
        onClick();
    };
    return (
        <>
            {/* Modal component */}
            <Modal
                show={show}
                centered
                className="profile-success-modal"
                backdrop="static"
            >
                <Modal.Header>
                    <Modal.Title className="mx-auto">
                        Profile Created Successfullty
                    </Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="problem"></div>

                    <Modal.Footer>
                        <BigButton
                            btnTitle={"Complete KYC"}
                            backgroundColor={"#FFCA6A"}
                            textColor={"#212529"}
                            handleClick={handleCloseModal}
                        />
                        <Link href={"/home"} className="text-profile">
                            <Button className="submit-btn">Go Home</Button>
                        </Link>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};
export default ProfileSuccessModalCard;
