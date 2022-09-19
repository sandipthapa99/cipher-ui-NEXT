import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useData } from "hooks/use-data";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import type {
    BankBranchResult,
    BankNamesResult,
    UserBankDetails,
} from "types/bankDetail";
import { BankFormData } from "utils/formData";
import { bankFormSchema } from "utils/formValidation/bankDetailsValidation";
import { isSubmittingClass } from "utils/helpers";

interface editProps {
    id?: number;
    isEdit?: boolean;
}
const BankForm = ({ id, isEdit }: editProps) => {
    console.log("🚀 id id id", id);
    const { mutate } = useForm(`/tasker/bank-details/`);

    const [bankId, setBankId] = useState<string>(
        isEdit ? id?.toString() || "" : ""
    );

    useEffect(() => {
        if (id) {
            setBankId(id.toString());
        }
    }, [bankId, id, setBankId]);

    console.log("bankId=", bankId);
    const queryClient = useQueryClient();
    const [isBankChanged, setIsBankChanged] = useState(false);
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

    const { data: BankDetails } = useData<UserBankDetails>(
        ["tasker-bank-account"],
        "/tasker/bank-details/"
    );
    const LinkedBank = BankDetails?.data.result;

    const editDetails = LinkedBank?.find((bank) => bank.id === id);

    const editBankId = bankNamesResults.find(
        (item) => item.label === editDetails?.bank_name.name
    );

    const editBranchId = bankBranchResults.find(
        (item) => item.label === editDetails?.branch_name.branch_name
    );

    const { mutate: editBankDetail } = useEditForm(
        `/tasker/bank-details/${id}/`
    );

    const accname = editDetails?.bank_account_name;
    const accnumber = editDetails?.bank_account_number;

    return (
        <div className="bank-form">
            <Formik
                enableReinitialize={true}
                initialValues={
                    editDetails && isEdit
                        ? {
                              bank_account_name: accname,
                              bank_account_number: accnumber,
                              bank_name:
                                  (editBankId && parseInt(editBankId?.value)) ??
                                  "",
                              branch_name:
                                  (editBranchId &&
                                      parseInt(editBranchId?.value)) ??
                                  "",
                              is_primary: editDetails.is_primary,
                          }
                        : BankFormData
                }
                validationSchema={bankFormSchema}
                onSubmit={async (values: any, actions: any) => {
                    const withKYC = { ...values, kyc: KYCData?.id };

                    editDetails
                        ? editBankDetail(withKYC, {
                              onSuccess: async () => {
                                  console.log("submitted values", withKYC);

                                  queryClient.invalidateQueries(["profile"]);
                                  toast.success(
                                      "Bank detail updated successfully!"
                                  );
                                  actions.resetForm();
                              },

                              onError: async (error: any) => {
                                  toast.error(error.message);
                                  console.log("error=", error);
                              },
                          })
                        : mutate(withKYC, {
                              onSuccess: async () => {
                                  actions.resetForm();
                                  toast.success(
                                      "Bank detail added successfully"
                                  );
                                  queryClient.invalidateQueries([
                                      "tasker-bank-account",
                                  ]);
                                  queryClient.invalidateQueries(["profile"]);
                              },
                              onError: async (error) => {
                                  toast.error(error.message);
                              },
                          });
                }}
            >
                {({
                    isSubmitting,
                    errors,
                    touched,
                    resetForm,
                    values,
                    setFieldValue,
                }) => (
                    <Form>
                        <pre>{JSON.stringify(errors, null, 4)}</pre>
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                        <Select
                            label="Bank Name"
                            placeholder={"Select Bank"}
                            name="ban_name"
                            searchable
                            nothingFound="No result found."
                            value={
                                editDetails && editBankId
                                    ? editBankId.value
                                    : bankNameChange
                            }
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
                            value={
                                editDetails && editBranchId
                                    ? editBranchId.value
                                    : !isBankChanged
                                    ? bankBranchResults[0]?.value
                                    : branchNameChange
                            }
                            onChange={(value) => {
                                handleBranchNameChanged(value, setFieldValue);
                                setIsBankChanged(true);
                            }}
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
                        {/* <a className="link" onClick={() => resetForm()}>
                            +Add More Bank
                        </a> */}
                        <div className="d-flex justify-content-end">
                            <Button
                                className="me-3 mb-0 cancel-btn"
                                onClick={() => resetForm()}
                            >
                                Clear
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
