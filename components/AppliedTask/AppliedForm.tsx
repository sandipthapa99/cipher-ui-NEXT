import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { Form, Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BookNowModalCardProps } from "types/bookNow";
import { ApplyFormData } from "utils/formData";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { isSubmittingClass } from "utils/helpers";

const AppliedForm = ({
    title,
    price,
    description,
    show,
    handleClose,
}: BookNowModalCardProps) => {
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    <div className="applied-modal__details">
                        <h4>
                            Title: <span>{title}</span>
                        </h4>

                        <h4>
                            Price: <span>{price}</span>
                        </h4>
                        <p>{description}</p>
                    </div>

                    <hr />
                    <Formik
                        initialValues={ApplyFormData}
                        validationSchema={applyFormSchema}
                        onSubmit={async (values) => {
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="w-25">
                                    <InputField
                                        type="text"
                                        name="price"
                                        labelName="Your Price"
                                        error={errors.price}
                                        touch={touched.price}
                                        placeHolder="Enter your price"
                                    />
                                </div>
                                <InputField
                                    name="remarks"
                                    labelName="Remarks"
                                    touch={touched.remarks}
                                    error={errors.remarks}
                                    placeHolder="Applying (Remark)"
                                    as="textarea"
                                />

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
        </>
    );
};
export default AppliedForm;
