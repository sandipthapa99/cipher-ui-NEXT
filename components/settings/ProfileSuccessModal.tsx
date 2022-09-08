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
}

const ProfileSuccessModalCard = ({
    show,
    setShowForm,
    onClick,
}: ProfileSuccessModalCardProps) => {
    const router = useRouter();

    return (
        <>
            {/* Modal component */}
            <Modal
                show={show}
                centered
                className="auth-modal"
                backdrop="static"
            >
                <Modal.Header>
                    <Modal.Title>Enter your verification code.</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="problem"></div>

                    <Modal.Footer>
                        <BigButton
                            btnTitle={"Complete KYC"}
                            backgroundColor={"#FFCA6A"}
                            textColor={"#212529"}
                            handleClick={() => onClick()}
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
