import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
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
    const { mutate } = useForm(`/tasker/bank-details/`);

    const [bankId, setBankId] = useState<string>("0");
    const queryClient = useQueryClient();

    const [bankNameChange, setBankNameChange] = useState<string | null>(null);
    const [branchNameChange, setBranchNameChange] = useState<string | null>(
        null
    );

    const { data: bankNames } = useData<BankNamesResult>(
        ["all-banks"],
        "/tasker/cms/bank-name/options"
    );

    const bankNamesResults: SelectItem[] = bankNames
        ? bankNames.data.map((result) => ({
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
        if (id) setFieldValue("bank_name", parseInt(id));
    };
    // const bankParseid = bankId ? parseInt(bankId) : "";

    const { data: bankBranch, isLoading } = useData<BankBranchResult>(
        ["all-branches", bankId],
        `/tasker/bank-branch/${parseInt(bankId)}`
    );

    const bankBranchResults: SelectItem[] = bankBranch?.data
        ? bankBranch.data.map((branch) => ({
              label: branch?.branch_name,
              value: branch?.id.toString(),
              id: branch?.id,
          }))
        : ([] as SelectItem[]);

    //handle branch name change
    const handleBranchNameChanged = (
        id: string | null,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setBranchNameChange(id);
        if (id) setFieldValue("branch_name", parseInt(id));
    };
    const { data: KYCData } = useGetKYC();

    return (
        <div className="bank-form">
            <h3>Bank Details</h3>
            <Formik
                initialValues={BankFormData}
                validationSchema={bankFormSchema}
                onSubmit={async (values) => {
                    const withKYC = { ...values, kyc: KYCData?.id };

                    mutate(withKYC, {
                        onSuccess: async () => {
                            console.log("submitted values", values);
                            toast.success("Bank detail added successfully");
                            queryClient.invalidateQueries(["profile"]);
                        },
                        onError: async (error) => {
                            toast.error(error.message);
                            console.log("error=", error);
                        },
                    });
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
                        <Select
                            label="Bank Name"
                            placeholder={"Select Bank"}
                            name="bank_name"
                            searchable
                            nothingFound="No result found."
                            value={bankNameChange}
                            onChange={(value) => {
                                handleBankNameChanged(value, setFieldValue);
                                setBankId(value ? value : "");
                            }}
                            data={bankNamesResults ?? []}
                        />

                        <Select
                            label="Branch Address"
                            name="branch_name"
                            searchable
                            placeholder={"Select Branch"}
                            nothingFound="No result found."
                            value={branchNameChange}
                            onChange={(value) =>
                                handleBranchNameChanged(value, setFieldValue)
                            }
                            data={
                                !isLoading ? bankBranchResults : [" Loading..."]
                            }
                        />

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
