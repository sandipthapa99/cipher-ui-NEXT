import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { isSubmittingClass } from "utils/helpers";
import * as Yup from "yup";
interface AuthenticationModalCardProps {
    show?: boolean;
    handleClose?: () => void;
    code?: number;
}
const AuthenticationData: AuthenticationModalCardProps = {
    code: 0,
};

const numReqOnly = Yup.number().required("Required field");

const schema = Yup.object().shape({
    code: numReqOnly,
});
const AuthenticationModalCard = ({
    handleClose,
    show,
}: AuthenticationModalCardProps) => {
    const router = useRouter();
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
                            console.log(values);
                            await router.push("task/checkout");
                            // setBookNowDetails((prev) => ({
                            //     ...prev,
                            //     ...values,
                            // }));
                        }}
                    >
                        {({ isSubmitting, errors, touched, setFieldValue }) => (
                            <Form>
                                <div className="problem">
                                    <h4>Code:</h4>
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
