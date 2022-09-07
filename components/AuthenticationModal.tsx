import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { isSubmittingClass } from "utils/helpers";
import * as Yup from "yup";

interface AuthenticationModalCardProps {
    show?: boolean;
    handleClose?: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}
interface AuthProps {
    otp?: string;
    phone: string;
}
const AuthenticationData: AuthProps = {
    otp: "",
    phone: "",
};

const strReqOnly = Yup.string().required("Required field");

const schema = Yup.object().shape({
    otp: strReqOnly,
});
const AuthenticationModalCard = ({
    handleClose,
    show,
    phone,
    setShowForm,
}: AuthenticationModalCardProps & AuthProps) => {
    const router = useRouter();
    const { mutate } = useForm(`/user/reset/otp/verify/`);

    const [otpNum, setOTPNum] = useState("");

    const handleSubmit = () => {
        console.log("values=");
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
            <Modal show={show} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Enter your verification otp</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="details"></div>
                    {/* <Formik
                        initialValues={AuthenticationData}
                        validationSchema={schema}
                        // onSubmit={async (values) => {
                        //     console.log("values=", values);
                        //     const dataToSend = {
                        //         otp: otpNum,
                        //         scope: "verify",
                        //         phone: phone,
                        //     };
                        //     console.log(dataToSend);
                        //     mutate(dataToSend, {
                        //         onSuccess: async () => {
                        //             toast.success("OTP verified!");
                        //             setShowForm(false);
                        //             router.push("/login");
                        //         },
                        //         onError: async (error) => {
                        //             toast.error(error.message);
                        //         },
                        //     });

                        //     console.log(values);
                        // }}
                    >
                        {({ isSubmitting, errors, touched }) => ( */}
                    <Form>
                        <div className="problem">
                            <h4>OTP:</h4>
                            {/* <InputField
                                        type="string"
                                        name="otp"
                                        error={errors.otp}
                                        touch={touched.otp}
                                        placeHolder="Your otp"
                                    /> */}
                            <OtpInput
                                value={otpNum}
                                onChange={() => setOTPNum(otpNum)}
                                numInputs={8}
                                separator={
                                    <span style={{ width: "8px" }}></span>
                                }
                                isInputNum={true}
                                shouldAutoFocus={true}
                                inputStyle={{
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    width: "54px",
                                    height: "54px",
                                    fontSize: "18px",
                                    color: "#111",
                                    fontWeight: "500",
                                    caretColor: "blue",
                                }}
                                focusStyle={{
                                    border: "1px solid #CFD3DB",
                                    outline: "none",
                                }}
                            />
                        </div>

                        <Modal.Footer>
                            <Button
                                className="btn close-btn"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="submit-btn w-25"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                            {/* <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Submit"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                        onClick={handleClose}
                                    /> */}
                        </Modal.Footer>
                    </Form>
                    {/* )}
                    </Formik> */}
                </div>
            </Modal>
        </>
    );
};
export default AuthenticationModalCard;
