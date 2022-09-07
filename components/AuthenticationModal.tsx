import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";

interface AuthenticationModalCardProps {
    show?: boolean;
    handleClose?: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}
interface AuthProps {
    otp?: string;
    phone: string;
}

const AuthenticationModalCard = ({
    handleClose,
    show,
    phone,
    setShowForm,
}: AuthenticationModalCardProps & AuthProps) => {
    const router = useRouter();
    const { mutate } = useForm(`/user/reset/otp/verify/`);

    const [otpNum, setOTPNum] = useState("");
    const handleChange = (otpNum: string) => {
        setOTPNum(otpNum);
    };
    const handleSubmit = () => {
        console.log("values=", otpNum);
        const dataToSend = {
            otp: otpNum,
            scope: "verify",
            phone: phone,
        };
        console.log(dataToSend);
        mutate(dataToSend, {
            onSuccess: async () => {
                toast.success("OTP verified!");
                setShowForm(false);
                router.push("/login");
            },
            onError: async (error) => {
                toast.error(error.message);
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
