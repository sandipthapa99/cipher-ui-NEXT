import { useMutation } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { useForm } from "hooks/use-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

interface AuthenticationModalCardProps {
    show?: boolean;
    handleClose?: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}
interface AuthProps {
    otp?: string;
    phone: string;
    scope: string;
}
interface ResendOtpPayload {
    phone: string;
    method: string;
}

const AuthenticationModalCard = ({
    handleClose,
    show,
    phone,
    setShowForm,
    scope,
}: AuthenticationModalCardProps & AuthProps) => {
    const router = useRouter();
    const { mutate } = useForm(`/user/reset/otp/verify/`);
    const { data: userDetails } = useUser();

    const [otpNum, setOTPNum] = useState("");
    const handleChange = (otpNum: string) => {
        setOTPNum(otpNum);
    };
    const resendOtpMutation = useMutation((data: ResendOtpPayload) => {
        return axiosClient.post(`/security/multi-factor/otp/create/`, data);
    });
    const phoneNum = Cookies.get("phone");
    const handleSubmit = () => {
        const dataToSend = {
            otp: otpNum,
            scope: scope,
            phone: phone,
        };
        const addPhone = {
            otp: otpNum,
            scope: scope,
        };
        const phoneNumber = userDetails ? addPhone : dataToSend;
        mutate(phoneNumber, {
            onSuccess: async () => {
                {
                    userDetails
                        ? toast.success("Successfully added phone number")
                        : toast.success("Successfully signed In.");
                }
                // toast.success("OTP verified!");
                setShowForm(false);
                router.push("/login");
            },
            onError: async () => {
                toast.error("Invalid OTP");
                setOTPNum("");
            },
        });
    };

    return (
        <>
            {/* Modal component */}
            <Modal
                show={show}
                centered
                onHide={handleClose}
                className="auth-modal"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enter your verification code.</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="problem">
                        <h4>OTP:</h4>
                        <div className="otp-wrapper">
                            <OtpInput
                                value={otpNum}
                                onChange={handleChange}
                                numInputs={8}
                                separator={
                                    <span style={{ width: "8px" }}></span>
                                }
                                isInputNum={true}
                                shouldAutoFocus={true}
                                className="otp-box"
                                focusStyle={{
                                    border: "1px solid #fff",
                                    outline: "none",
                                }}
                            />
                        </div>
                        <div className="resend-otp">
                            <p
                                className="m-0 "
                                onClick={() => {
                                    if (phoneNum) {
                                        resendOtpMutation.mutate(
                                            {
                                                phone: phoneNum,
                                                method: "SMS",
                                            },
                                            {
                                                onSuccess: () => {
                                                    toast.success(
                                                        "OTP sent successfully"
                                                    );
                                                },
                                                onError: (err: any) => {
                                                    toast.error(err.message);
                                                },
                                            }
                                        );
                                    }
                                }}
                            >
                                Resend Otp
                            </p>
                        </div>
                    </div>

                    <Modal.Footer>
                        <Button className="btn close-btn" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button className="submit-btn" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};
export default AuthenticationModalCard;
