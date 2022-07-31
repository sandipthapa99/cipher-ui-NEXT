// import { DatePickerField } from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useSuccessContext } from "context/successContext/successContext";
import { Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ApplyFormData } from "utils/formData";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface ExperienceProps {
    show?: boolean;
    handleClose?: () => void;
}

const ExperienceForm = ({ show, handleClose }: ExperienceProps) => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <>
            {/* Modal component */}
            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    <hr />
                    <Formik
                        initialValues={ApplyFormData}
                        validationSchema={applyFormSchema}
                        onSubmit={async (values) => {
                            setShowSuccessModal(true);
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <InputField
                                    type="text"
                                    name="price"
                                    labelName="Title"
                                    error={errors.price}
                                    touch={touched.price}
                                    placeHolder="Enter your price"
                                />
                                <InputField
                                    name="remarks"
                                    labelName="Description"
                                    touch={touched.remarks}
                                    error={errors.remarks}
                                    placeHolder="Applying (Remark)"
                                    as="textarea"
                                />
                                <SelectInputField
                                    name={"Employment Type"}
                                    options={[]}
                                />
                                <InputField
                                    name="remarks"
                                    labelName="Description"
                                    touch={touched.remarks}
                                    error={errors.remarks}
                                    placeHolder="Applying (Remark)"
                                />
                                <InputField
                                    name="remarks"
                                    labelName="Description"
                                    touch={touched.remarks}
                                    error={errors.remarks}
                                    placeHolder="Applying (Remark)"
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        <DatePickerField name="date" />
                                    </Col>
                                    <Col md={6}>
                                        <InputField
                                            name="remarks"
                                            labelName="Description"
                                            touch={touched.remarks}
                                            error={errors.remarks}
                                            placeHolder="Applying (Remark)"
                                        />
                                    </Col>
                                </Row>

                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn w-25"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>

                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Apply"
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
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            /> */}
        </>
    );
};
export default ExperienceForm;
