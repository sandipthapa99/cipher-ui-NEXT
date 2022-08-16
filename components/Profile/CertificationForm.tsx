import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
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
    const queryClient = useQueryClient();
    const toggleSuccessModal = useToggleSuccessModal();
    const { mutate } = useForm(`/tasker/certification/`);
    return (
        <Fragment>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Add Certifications</h3>
                    <Formik
                        initialValues={CertificationFromData}
                        validationSchema={certificateFormSchema}
                        onSubmit={async (values, action) => {
                            const newvalidatedValue = {
                                ...values,
                                issued_date: format(
                                    new Date(values.issued_date ?? new Date()),
                                    "yyyy-MM-dd"
                                ),
                                expire_date: format(
                                    new Date(values.expire_date ?? new Date()),
                                    "yyyy-MM-dd"
                                ),
                            };
                            mutate(newvalidatedValue, {
                                onSuccess: async () => {
                                    setShowCertificationModal(false);
                                    toggleSuccessModal();
                                    queryClient.invalidateQueries([
                                        "tasker-certification",
                                    ]);
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            });
                            action.resetForm();
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
                                    name="issuing_organization"
                                    labelName="Organization"
                                    touch={touched.issuing_organization}
                                    error={errors.issuing_organization}
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
                                        name="does_expire"
                                        className="checkbox-toggle me-2"
                                    />{" "}
                                    This certifate does not expire
                                </p>
                                <InputField
                                    name="credential_id"
                                    labelName="Credential Id"
                                    touch={touched.credential_id}
                                    error={errors.credential_id}
                                    placeHolder="Eg: Cagtu"
                                />
                                <InputField
                                    name="certificate_url"
                                    labelName="Certificate URL"
                                    touch={touched.certificate_url}
                                    error={errors.certificate_url}
                                    placeHolder="Eg: Cagtu"
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        <DatePickerField
                                            name="issued_date"
                                            labelName="Issued Date"
                                            placeHolder="day/month/year"
                                            touch={touched.issued_date}
                                            error={errors.issued_date}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <DatePickerField
                                            name="expire_date"
                                            labelName="Expiration Date"
                                            placeHolder="day/month/year"
                                            touch={touched.expire_date}
                                            error={errors.expire_date}
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
        </Fragment>
    );
};
export default CertificationForm;
