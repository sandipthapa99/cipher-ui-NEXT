import {
    faCircleCheck,
    faCircleExclamation,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { useForm } from "hooks/use-form";
import Cookies from "js-cookie";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import { useTimer } from "react-timer-hook";
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
    const { mutate } = useForm(`/user/reset/otp/verify/`);
    const { data: userDetails } = useUser();

    const [otpNum, setOTPNum] = useState("");
    const [errorAlertMsg, setErrorAlertMsg] = useState("");
    const [successAlertMsg, setSuccessAlertMsg] = useState("");
    const [isResend, setIsResendOTP] = useState(true);
    const [isRunning, setIsRunning] = useState(true);

    const handleChange = (otpNum: string) => {
        setOTPNum(otpNum);
        // setErrorAlertMsg("");
    };

    const resendOtpMutation = useMutation((data: ResendOtpPayload) => {
        return axiosClient.post(`/security/multi-factor/otp/create/`, data);
    });

    const phoneNum = Cookies.get("phone");

    const time = new Date();
    time.setSeconds(time.getSeconds() + 90);

    const MyTimer = ({ expiryTimestamp }: { expiryTimestamp: Date }) => {
        const { seconds, minutes, isRunning } = useTimer({
            expiryTimestamp,
            onExpire: () => console.warn("Timer Expired"),
        });
        {
            isRunning ? setIsRunning(true) : setIsRunning(false);
        }
        return (
            <div>
                <div>
                    <p className="m-0 pt-3" style={{ textAlign: "right" }}>
                        Request new OTP in {minutes}m : {seconds}s
                    </p>
                </div>
            </div>
        );
    };
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
                // router.push("/login");
            },
            onError: async (error: any) => {
                const { otp } = error.response.data;
                setErrorAlertMsg(otp[0]);
                setSuccessAlertMsg("");
            },
        });
    };

    const ResendOTP = () => {
        return (
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
                                    onSuccess: (data) => {
                                        const expiryDate = new Date(
                                            data.data.expires_at
                                        ).toLocaleString("en-GB", {
                                            timeZone: "UTC",
                                        });
                                        setSuccessAlertMsg(
                                            `OTP sent to your registered phone number and will expires on ${expiryDate}`
                                        );
                                        setErrorAlertMsg("");
                                        setIsResendOTP(false);
                                        setIsRunning(true);
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
        );
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
                                numInputs={6}
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
                        {isResend === true || !isRunning === true ? (
                            <ResendOTP />
                        ) : (
                            <MyTimer expiryTimestamp={time} />
                        )}

                        {errorAlertMsg !== "" && (
                            <Alert
                                icon={
                                    <FontAwesomeIcon
                                        icon={faCircleExclamation}
                                    />
                                }
                                title="Oops!"
                                color="red"
                                className="mt-3"
                                withCloseButton={true}
                                onClose={() => setErrorAlertMsg("")}
                            >
                                {errorAlertMsg}
                            </Alert>
                        )}
                        {successAlertMsg !== "" && (
                            <Alert
                                icon={<FontAwesomeIcon icon={faCircleCheck} />}
                                title="Success"
                                color="teal"
                                className="mt-3"
                                withCloseButton={true}
                                onClose={() => setSuccessAlertMsg("")}
                            >
                                {successAlertMsg}
                            </Alert>
                        )}
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
