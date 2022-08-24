import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { CertificationValueProps } from "types/certificationValueProps";
import { CertificationFormData } from "utils/formData";
import { certificateFormSchema } from "utils/formValidation/certificateFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface CertificationProps {
    show?: boolean;
    handleClose?: () => void;
    setShowCertificationModal: Dispatch<SetStateAction<boolean>>;
    id?: number;
}
interface EditDetailProps {
    data: { result: CertificationValueProps[] };
}

const CertificationForm = ({
    show,
    handleClose,
    id,
    setShowCertificationModal,
}: CertificationProps) => {
    const queryClient = useQueryClient();
    const { mutate } = useForm(`/tasker/certification/`);

    const { mutate: editMutation } = useEditForm(
        `/tasker/certification/${id}/`
    );

    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-certification",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);
    const [toggle, setToggled] = useState(editDetails?.does_expire ?? false);

    return (
        <Fragment>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Add Certifications</h3>
                    <Formik
                        initialValues={
                            editDetails
                                ? {
                                      ...editDetails,
                                      issued_date: parseISO(
                                          editDetails.issued_date
                                      ),

                                      expire_date: editDetails.expire_date
                                          ? parseISO(editDetails.expire_date)
                                          : "",
                                  }
                                : CertificationFormData
                        }
                        validationSchema={certificateFormSchema}
                        onSubmit={async (values, action) => {
                            let newValue;
                            if (!values.expire_date) {
                                const withoutEndDate = {
                                    ...values,
                                    issued_date: format(
                                        new Date(values.issued_date),
                                        "yyyy-MM-dd"
                                    ),
                                    expire_date: null,
                                };
                                newValue = withoutEndDate;
                            } else {
                                const newvalidatedValue = {
                                    ...values,
                                    issued_date: format(
                                        new Date(values.issued_date),
                                        "yyyy-MM-dd"
                                    ),

                                    expire_date: format(
                                        new Date(values.expire_date),
                                        "yyyy-MM-dd"
                                    ),
                                };
                                newValue = newvalidatedValue;
                            }
                            {
                                editDetails
                                    ? editMutation(newValue, {
                                          onSuccess: async () => {
                                              console.log(
                                                  "submitted values",
                                                  values
                                              );
                                              setShowCertificationModal(false);
                                              queryClient.invalidateQueries([
                                                  "tasker-certification",
                                              ]);
                                              toast.success(
                                                  "Certificate detail updated successfully"
                                              );
                                          },
                                          onError: async (error: any) => {
                                              toast.error(error.message);
                                              console.log("error=", error);
                                          },
                                      })
                                    : mutate(newValue, {
                                          onSuccess: async () => {
                                              setShowCertificationModal(false);
                                              toast.success(
                                                  "Certificate detail added successfully"
                                              );
                                              queryClient.invalidateQueries([
                                                  "tasker-certification",
                                              ]);
                                          },
                                          onError: (error) => {
                                              toast.error(error.message);
                                          },
                                      });
                            }

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
                                    <input
                                        type="checkbox"
                                        name="does_expire"
                                        checked={toggle ? true : false}
                                        onChange={() => setToggled(!toggle)}
                                    />
                                    &nbsp; This certifate does not expire
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
                                            placeHolder="2022-03-06"
                                            touch={touched.issued_date}
                                            error={errors.issued_date}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <DatePickerField
                                            name="expire_date"
                                            labelName="Expiration Date"
                                            placeHolder={
                                                toggle
                                                    ? "No Expiration Date"
                                                    : "2022-03-06"
                                            }
                                            dateFormat="yyyy-MM-dd"
                                            touch={touched.expire_date}
                                            error={errors.expire_date}
                                            disabled={toggle ? true : false}
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
