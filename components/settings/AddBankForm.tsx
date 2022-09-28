import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import type { SelectItem } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import type {
    BankBranchResult,
    BankNamesResult,
    UserBankDetails,
} from "types/bankDetail";
// import { BankFormData } from "utils/formData";
import { bankFormSchema } from "utils/formValidation/bankDetailsValidation";
import { isSubmittingClass } from "utils/helpers";

import { CompleteProfile } from "./ProfileForm";

interface editProps {
    id?: number;
    bankDetail?: any;
    isEdit?: boolean;
}
interface Display {
    showBankForm: boolean;
}
const BankForm = ({
    id,
    isEdit,
    bankDetail,
    showBankForm,
}: editProps & Display) => {
    const { mutate } = useForm(`/tasker/bank-details/`);

    const [bankId, setBankId] = useState<string>(
        isEdit ? bankDetail.bank_name.id?.toString() || "" : ""
    );

    useEffect(() => {
        if (id) {
            setBankId(bankDetail.bank_name.id.toString());
        }
    }, [bankDetail?.bank_name.id, id, setBankId]);

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
    const [changeBranch, setChangeBranch] = useState(
        editBranchId ? editBranchId?.value : ""
    );

    useEffect(() => {
        setChangeBranch(
            changeBranch ? changeBranch : editBranchId?.value ?? ""
        );
    }, [changeBranch, editBranchId?.value]);

    const accname = editDetails?.bank_account_name;
    const accnumber = editDetails?.bank_account_number;

    return (
        <div
            //ref={ref}
            className="bank-form"
            style={showBankForm ? { display: "block" } : { display: "none" }}
        >
            <Formik
                enableReinitialize={true}
                initialValues={
                    editDetails && isEdit
                        ? {
                              bank_account_name: accname,
                              bank_account_number: accnumber,
                              bank_name:
                                  editBankId && parseInt(editBankId?.value),

                              branch_name:
                                  editBranchId && parseInt(changeBranch),
                              is_primary: editDetails.is_primary,
                          }
                        : {
                              bank_account_name: "",
                              branch_name: bankBranchResults
                                  ? bankBranchResults[0]?.value
                                  : "",
                              bank_name: bankNamesResults
                                  ? bankNamesResults[0]?.value
                                  : "",
                              bank_account_number: "",
                              is_primary: false,
                          }
                }
                validationSchema={bankFormSchema}
                onSubmit={async (values: any, actions: any) => {
                    const withKYC = { ...values, kyc: KYCData?.id };

                    editDetails
                        ? editBankDetail(withKYC, {
                              onSuccess: async () => {
                                  queryClient.invalidateQueries(["profile"]);
                                  queryClient.invalidateQueries([
                                      "tasker-bank-account",
                                  ]);
                                  toast.success(
                                      "Bank detail updated successfully!"
                                  );
                                  actions.resetForm();
                              },

                              onError: async (error: any) => {
                                  toast.error(error.message);
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
                        <Select
                            label="Bank Name"
                            placeholder={"Select Bank"}
                            name="bank_name"
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
                            required
                        />
                        <Select
                            label="Branch Address"
                            name="branch_name"
                            searchable
                            placeholder={"Select Branch"}
                            nothingFound="No result found."
                            key={changeBranch}
                            // value={
                            //     editDetails && editBranchId
                            //         ? editBranchId.value
                            //         : !isBankChanged
                            //         ? bankBranchResults[0]?.value
                            //         : branchNameChange
                            // }
                            value={changeBranch}
                            required
                            onChange={(value) => {
                                console.log(
                                    "🚀 ~ file: AddBankForm.tsx ~ line 248 ~ BankForm ~ value",
                                    value
                                );
                                setChangeBranch(value ? value : "");
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
