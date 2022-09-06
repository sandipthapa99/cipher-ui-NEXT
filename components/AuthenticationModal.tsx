import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { isSubmittingClass } from "utils/helpers";
import * as Yup from "yup";

interface AuthenticationModalCardProps {
    show?: boolean;
    handleClose?: () => void;
    code?: number;
    username: string;
}
const AuthenticationData: AuthenticationModalCardProps = {
    code: 0,
    username: "",
};

const numReqOnly = Yup.number().required("Required field");

const schema = Yup.object().shape({
    code: numReqOnly,
});
const AuthenticationModalCard = ({
    handleClose,
    show,
    username,
}: AuthenticationModalCardProps) => {
    const router = useRouter();

    const { mutate } = useForm(`/security/multi-factor/otp/verify/`);
    console.log("phoneNu", username);
    return (
        <>
            {/* Modal component */}
            <Modal show={show} centered onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Enter your verification code</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <div className="details"></div>
                    <Formik
                        initialValues={AuthenticationData}
                        validationSchema={schema}
                        onSubmit={async (values) => {
                            console.log("values=", values);
                            const dataToSend = {
                                code: values.code,
                                method: "otp",
                                username: username,
                            };
                            console.log(dataToSend);
                            mutate(dataToSend, {
                                onSuccess: async () => {
                                    toast.success("OTP verified!");
                                },
                                onError: async (error) => {
                                    toast.error(error.message);
                                },
                            });

                            console.log(values);
                            await router.push("task/checkout");
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="problem">
                                    <h4>OTP:</h4>
                                    <InputField
                                        type="number"
                                        name="code"
                                        error={errors.code}
                                        touch={touched.code}
                                        placeHolder="Your Code"
                                    />
                                </div>

                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Submit"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                        onClick={handleClose}
                                    />
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    );
};
export default AuthenticationModalCard;
