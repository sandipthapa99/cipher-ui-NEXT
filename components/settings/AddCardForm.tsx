import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Field, Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useToggleSuccessModal } from "store/use-success-modal";
import { CreditCardFromData } from "utils/formData";
import { creditCardValidationSchema } from "utils/formValidation/creditCardValidation";
import { isSubmittingClass } from "utils/helpers";

interface AddCardFormProps {
    show?: boolean;
    handleClose?: () => void;
    setShowAddCardForm: Dispatch<SetStateAction<boolean>>;
}

const AddCardForm = ({
    show,
    handleClose,
    setShowAddCardForm,
}: AddCardFormProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} size="sm" backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Add New card</h3>
                    <Formik
                        initialValues={CreditCardFromData}
                        validationSchema={creditCardValidationSchema}
                        onSubmit={async (values) => {
                            setShowAddCardForm(false);
                            toggleSuccessModal();
                            // To be used for API
                            // try {
                            //     axiosClient.post("/routes", values);
                            // } catch (error: any) {
                            //     error.response.data.message;
                            // }
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched, values }) => (
                            <Form autoComplete="off">
                                <InputField
                                    type="text"
                                    name="name"
                                    labelName="Card Holder's Name"
                                    error={errors.name}
                                    touch={touched.name}
                                    placeHolder="Add Card Holder's Name"
                                />
                                <InputField
                                    name="number"
                                    labelName="Card Number"
                                    touch={touched.number}
                                    error={errors.number}
                                    placeHolder="Add Card Number"
                                    value={values.number
                                        .replace(/\s/g, "")
                                        .replace(/(\d{4})/g, "$1 ")
                                        .trim()}
                                    maxLength={19}
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        <InputField
                                            name="expDate"
                                            labelName="Expired Date"
                                            touch={touched.expDate}
                                            error={errors.expDate}
                                            value={values.expDate
                                                .replace(/\s/g, "")
                                                .replace(/(\d{2})/g, "$1 ")
                                                .trim()}
                                            placeHolder="mm/yy"
                                            maxLength={5}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <InputField
                                            name="cvv"
                                            labelName="CVV"
                                            touch={touched.cvv}
                                            error={errors.cvv}
                                            placeHolder="CVV"
                                            maxLength={3}
                                        />
                                    </Col>
                                </Row>
                                <label className="me-3">
                                    <Field
                                        type="checkbox"
                                        name="userType"
                                        value="Client"
                                        className="me-2"
                                    />
                                    Save as default card
                                </label>
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
                                        name="Apply"
                                        className="submit-btn"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                    />
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};
export default AddCardForm;
