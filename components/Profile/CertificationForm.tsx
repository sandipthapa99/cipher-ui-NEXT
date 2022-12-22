import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import { PostCard } from "@components/PostTask/PostCard";
import { RichText } from "@components/RichText";
import {
    faCalendarDays,
    faSquareCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format, parseISO } from "date-fns";
import { Field, Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type { CertificationValueProps } from "types/certificationValueProps";
import { certificateFormSchema } from "utils/formValidation/certificateFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

interface CertificationProps {
    show?: boolean;
    handleClose?: () => void;
    setShowCertificationModal: Dispatch<SetStateAction<boolean>>;
    id?: number;
    isEditProfile: boolean;
}
interface EditDetailProps {
    data: { result: CertificationValueProps[] };
}

const CertificationForm = ({
    show,
    handleClose,
    id,
    setShowCertificationModal,
    isEditProfile,
}: CertificationProps) => {
    const queryClient = useQueryClient();
    const { mutate } = useForm(`${urls.profile.certifications}`);

    const { mutate: editMutation } = useEditForm(
        `${urls.profile.certifications}${id}/`
    );

    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-certification",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);
    const doesExpire =
        isEditProfile === true ? editDetails?.does_expire : false;
    const [toggle, setToggled] = useState(doesExpire);
    console.log("does expire", doesExpire, isEditProfile, toggle);

    return (
        <Fragment>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal  add-portfolio">
                    <h3>Add Certifications</h3>
                    <Formik
                        enableReinitialize
                        initialValues={
                            editDetails && isEditProfile === true
                                ? {
                                      ...editDetails,
                                      issued_date: parseISO(
                                          editDetails.issued_date
                                      ),

                                      expire_date: editDetails.expire_date
                                          ? parseISO(editDetails.expire_date)
                                          : "",
                                  }
                                : {
                                      name: "",
                                      issuing_organization: "",
                                      description: "",
                                      does_expire: false,
                                      credential_id: "",
                                      certificate_url: "",
                                      issued_date: "",
                                      expire_date: "",
                                      id: 0,
                                  }
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
                                editDetails && isEditProfile
                                    ? editMutation(newValue, {
                                          onSuccess: async () => {
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
                        {({
                            isSubmitting,
                            getFieldProps,
                            setFieldValue,
                            errors,
                            touched,
                            values,
                        }) => (
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
                                />
                                {/* <InputField
                                    name="description"
                                    labelName="Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Experience Description"
                                    as="textarea"
                                /> */}
                                <InputField
                                    name="description"
                                    labelName="Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Experience Description"
                                    as="textarea"
                                />
                                {/* <RichText
                                    {...getFieldProps("description")}
                                    value={values?.description ?? ""}
                                    onChange={(value) =>
                                        setFieldValue("description", value)
                                    }
                                    placeholder="Description"
                                /> */}

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
                                <br />
                                <p className="mb-3 d-flex checkbox">
                                    {/* <input
                                        type="checkbox"
                                        name="does_expire"
                                        checked={toggle ? true : false}
                                        onChange={() => setToggled(!toggle)}
                                    /> */}
                                    <Checkbox
                                        label="This certifate does not expire"
                                        checked={toggle}
                                        {...getFieldProps("does_expire")}
                                        onChange={(event) => {
                                            setToggled(!toggle);
                                            setFieldValue(
                                                "does_expire",
                                                event.target.checked
                                            );
                                        }}
                                    />
                                    {/* <Field
                                        type="checkbox"
                                        {...getFieldProps("does_expire")}
                                        onChange={(event) => {
                                            setToggled(!toggle);
                                            setFieldValue(
                                                "does_expire",
                                                event.target.checked
                                            );
                                        }}
                                        className="me-2"
                                    /> */}
                                    &nbsp; This certifate does not expire
                                </p>
                                <Row className="g-5">
                                    <Col md={6}>
                                        {/* <DatePickerField
                                            name="issued_date"
                                            labelName="Issued Date"
                                            placeHolder="2022-03-06"
                                            touch={touched.issued_date}
                                            error={errors.issued_date}
                                            dateFormat="yyyy-MM-dd"
                                        /> */}

                                        <MantineDateField
                                            name="issued_date"
                                            labelName="Issued Date"
                                            placeHolder="1999-06-03"
                                            touch={Boolean(touched.issued_date)}
                                            error={String(
                                                errors.issued_date
                                                    ? errors.issued_date
                                                    : ""
                                            )}
                                            //fieldRequired={true}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "issued_date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        {/* <DatePickerField
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
                                        /> */}
                                        <MantineDateField
                                            name="expire_date"
                                            labelName="Expiration Date"
                                            touch={Boolean(touched.expire_date)}
                                            error={String(
                                                errors.expire_date
                                                    ? errors.expire_date
                                                    : ""
                                            )}
                                            //fieldRequired={true}
                                            placeHolder={
                                                toggle
                                                    ? "No Expiration Date"
                                                    : "2022-03-06"
                                            }
                                            disabled={toggle ? true : false}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "expire_date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
                                        />
                                    </Col>
                                </Row>

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
        </Fragment>
    );
};

export default CertificationForm;
