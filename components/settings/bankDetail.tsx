import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useData } from "hooks/use-data";
import { useForm } from "hooks/use-form";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import type { BankBranchResult, BankNamesResult } from "types/bankDetail";
import { BankFormData } from "utils/formData";
import { bankFormSchema } from "utils/formValidation/bankDetailsValidation";
import { isSubmittingClass } from "utils/helpers";

const BankForm = () => {
    const { mutate } = useForm(`/tasker/experience/`);

    const queryClient = useQueryClient();
    const [bankNameChange, setBankNameChange] = useState<string | null>(null);
    const [branchNameChange, setBranchNameChange] = useState<string | null>(
        null
    );
    const { data: bankNames } = useData<BankNamesResult>(
        ["all-banks"],
        "/tasker/cms/bank-name/"
    );

    const { data: bankBranch } = useData<BankBranchResult>(
        ["all-banks"],
        "/tasker/cms/bank-branch/"
    );

    const bankNamesResults: SelectItem[] = bankNames?.data.results
        ? bankNames.data.results.map((result) => ({
              label: result?.name,
              value: result?.id.toString(),
              id: result?.id,
          }))
        : ([] as SelectItem[]);
    //handle bank name change
    const handleBankNameChanged = (
        id: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setBankNameChange(id);
        if (id) setFieldValue("name", parseInt(id));
    };

    const bankBranchResults: SelectItem[] = bankBranch?.data.results
        ? bankBranch.data.results.map((result) => ({
              label: result?.branch_name,
              value: result?.id.toString(),
              id: result?.id,
          }))
        : ([] as SelectItem[]);

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
                {({
                    isSubmitting,
                    errors,
                    touched,
                    resetForm,
                    setFieldValue,
                }) => (
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
                            name="bank_name"
                            searchable
                            nothingFound="No result found."
                            value={bankNameChange}
                            onChange={(value) =>
                                handleBankNameChanged(value, setFieldValue)
                            }
                            data={bankNamesResults ?? []}
                            // disabled={
                            //     isEditButtonClicked || !profile ? false : true
                            // }
                        />

                        <Select
                            label="Branch Address"
                            placeholder="Default Branch"
                            name="branch_name"
                            searchable
                            nothingFound="No result found."
                            // value={
                            //     profile ? foundCountry?.value : countryChange
                            // }
                            // onChange={(value) =>
                            //     handleCountryChanged(value, setFieldValue)
                            // }
                            data={bankBranchResults ?? []}
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
                                    name="bank_account_name"
                                    labelName="Bank Account Name"
                                    error={errors.bank_account_name}
                                    touch={touched.bank_account_name}
                                    placeHolder="Enter Account Name"
                                    fieldRequired
                                />
                            </Col>
                            <Col md={6}>
                                <InputField
                                    type="text"
                                    name="bank_account_number"
                                    labelName="Bank Account Number"
                                    error={errors.bank_account_number}
                                    touch={touched.bank_account_number}
                                    placeHolder="Enter Account Number"
                                    fieldRequired
                                />
                            </Col>
                        </Row>
                        {/* <InputField
                            type="text"
                            name="swift_code"
                            labelName="Swift Code"
                            error={errors.swift_code}
                            touch={touched.swift_code}
                            placeHolder="Swift Code"
                        /> */}
                        <div className="checkbox">
                            <label className="me-3">
                                <Field
                                    type="checkbox"
                                    name="is_primary"
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
