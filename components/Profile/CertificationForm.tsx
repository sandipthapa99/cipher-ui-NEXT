import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useSuccessContext } from "context/successContext/successContext";
import { Field, Form, Formik } from "formik";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CertificationFromData } from "utils/formData";
import { certificateFormSchema } from "utils/formValidation/certificateFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface CertificationProps {
    show?: boolean;
    handleClose?: () => void;
    setShowCertificationModal: Dispatch<SetStateAction<boolean>>;
}

const CertificationForm = ({
    show,
    handleClose,
    setShowCertificationModal,
}: CertificationProps) => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Add Certifications</h3>
                    <Formik
                        initialValues={CertificationFromData}
                        validationSchema={certificateFormSchema}
                        onSubmit={async (values) => {
                            setShowCertificationModal(false);
                            setShowSuccessModal(true);
                            console.log(values);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form autoComplete="off">
                                <InputField
                                    type="text"
                                    name="name"
                                    labelName="Name"
                                    error={errors.name}
                                    touch={touched.name}
                                    placeHolder="Eg: Certified Gardener"
                                />
                                <InputField
                                    name="organization"
                                    labelName="Organization"
                                    touch={touched.organization}
                                    error={errors.organization}
                                    placeHolder="Eg: Cagtu"
                                    as="textarea"
                                />
                                <InputField
                                    name="description"
                                    labelName="Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Experience Description"
                                />
                                <p className="mb-3 d-flex checkbox">
                                    <Field
                                        type="checkbox"
                                        name="toggle"
                                        className="checkbox-toggle me-2"
                                    />{" "}
                                    This certifate does not expire
                                </p>
                                <InputField
                                    name="credentialId"
                                    labelName="Credential Id"
                                    touch={touched.credentialId}
                                    error={errors.credentialId}
                                    placeHolder="Eg: Cagtu"
                                />
                                <InputField
                                    name="certificateURL"
                                    labelName="Certificate URL"
                                    touch={touched.certificateURL}
                                    error={errors.certificateURL}
                                    placeHolder="Eg: Cagtu"
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        <DatePickerField
                                            name="issuedDate"
                                            labelName="issuedDate"
                                            placeHolder="day/month/year"
                                            touch={touched.issuedDate}
                                            error={errors.issuedDate}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <DatePickerField
                                            name="expirationDate"
                                            labelName="Expiration Date"
                                            placeHolder="day/month/year"
                                            touch={touched.expirationDate}
                                            error={errors.expirationDate}
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
export default CertificationForm;
