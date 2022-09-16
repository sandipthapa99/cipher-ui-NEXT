import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { BankFormData } from "utils/formData";
import { bankFormSchema } from "utils/formValidation/bankDetailsValidation";
import { isSubmittingClass } from "utils/helpers";

const BankForm = () => {
    const { mutate } = useForm(`/tasker/experience/`);

    const queryClient = useQueryClient();
    return (
        <div className="bank-form">
            <h3>Bank Details</h3>
            <Formik
                initialValues={BankFormData}
                validationSchema={bankFormSchema}
                onSubmit={async (values, actions) => {
                    console.log("bank details are", actions, values);
                    // mutate(values, {
                    //     onSuccess: async () => {
                    //         console.log("submitted values", values);
                    //         toast.success("Bank detail added successfully");
                    //         queryClient.invalidateQueries(["profile"]);
                    //         actions.resetForm();
                    //     },
                    //     onError: async (error) => {
                    //         toast.error(error.message);
                    //         console.log("error=", error);
                    //     },
                    // });
                }}
            >
                {({ isSubmitting, errors, touched, resetForm }) => (
                    <Form>
                        {/* <SelectInputField
                            type="text"
                            name="name"
                            labelName="Bank Name"
                            error={errors.name}
                            touch={touched.name}
                            placeHolder="Select Bank"
                            fieldRequired
                            //options={dropdownOptions}
                        /> */}
                        <Select
                            label="Bank Name"
                            placeholder="Select Bank"
                            name="name"
                            searchable
                            nothingFound="No result found."
                            // value={
                            //     profile ? foundCountry?.value : countryChange
                            // }
                            // onChange={(value) =>
                            //     handleCountryChanged(value, setFieldValue)
                            // }
                            data={["Nabil", "NIC Asia"]}
                            // disabled={
                            //     isEditButtonClicked || !profile ? false : true
                            // }
                        />

                        <Select
                            label="Branch Address"
                            placeholder="Default Branch"
                            name="address"
                            searchable
                            nothingFound="No result found."
                            // value={
                            //     profile ? foundCountry?.value : countryChange
                            // }
                            // onChange={(value) =>
                            //     handleCountryChanged(value, setFieldValue)
                            // }
                            data={["KTM", "Pyuthan"]}
                            // disabled={
                            //     isEditButtonClicked || !profile ? false : true
                            // }
                        />
                        {/* <SelectInputField
                            type="text"
                            name="address"
                            labelName="Branch Address"
                            error={errors.address}
                            touch={touched.address}
                            placeHolder="Default Branch"
                            fieldRequired
                            //options={dropdownOptions}
                        /> */}
                        <Row>
                            <Col md={6}>
                                <InputField
                                    type="text"
                                    name="account_name"
                                    labelName="Bank Account Name"
                                    error={errors.account_name}
                                    touch={touched.account_name}
                                    placeHolder="Enter Account Name"
                                    fieldRequired
                                />
                            </Col>
                            <Col md={6}>
                                <InputField
                                    type="text"
                                    name="account_number"
                                    labelName="Bank Account Name"
                                    error={errors.account_number}
                                    touch={touched.account_number}
                                    placeHolder="Enter Account Number"
                                    fieldRequired
                                />
                            </Col>
                        </Row>
                        <InputField
                            type="text"
                            name="swift_code"
                            labelName="Swift Code"
                            error={errors.swift_code}
                            touch={touched.swift_code}
                            placeHolder="Swift Code"
                        />
                        <div className="checkbox">
                            <label className="me-3">
                                <Field
                                    type="checkbox"
                                    name="primary_bank"
                                    className="me-2"
                                />
                                <span>Primary Bank</span>
                            </label>
                        </div>

                        <a className="link" onClick={() => resetForm()}>
                            +Add More Bank
                        </a>
                        <div className="d-flex justify-content-end">
                            <Button
                                className="me-3 mb-0 cancel-btn"
                                onClick={() => resetForm()}
                                //  onClick={handleClose}
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
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BankForm;
