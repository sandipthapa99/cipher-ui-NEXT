import { CustomDropZone } from "@components/common/CustomDropZone";
import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import FullPageLoader from "@components/common/FullPageLoader";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useDocumentKYC } from "hooks/profile/kyc/use-Kyc-Document";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { KYCDocumentSchema } from "utils/formValidation/kycDocument";
import { isSubmittingClass } from "utils/helpers";
export type KYCDocuments = {
    kyc: number | undefined | string;
    document_type: string;
    document_id: string;
    file: string;
    issuer_organization: string;
    issued_date: Date | string;
    valid_through: Date | string;
};

export const IdentityDocument = () => {
    const { data: KYCData, refetch } = useGetKYC();
    const { mutate, isLoading } = useDocumentKYC();
    // if (isLoading) return <FullPageLoader />;

    // if (!KYCData || isLoading) {
    //     refetch();
    //     return <FullPageLoader />;
    // }

    const dropdownDocument = [
        {
            id: 0,
            label: "Citizenship",
            value: "citizenship",
        },
        {
            id: 1,
            label: "Pan Card",
            value: "pancard",
        },
        {
            id: 2,
            label: "Passport",
            value: "passport",
        },
    ];
    return (
        <Formik
            initialValues={{
                document_type: "",
                document_id: "",
                file: "",
                issuer_organization: "",
                issued_date: "",
                valid_through: "",
                kyc: KYCData ? KYCData.id : "",
            }}
            validationSchema={KYCDocumentSchema}
            onSubmit={(val, action) => {
                const formData: FormData = new FormData();

                const newValues = {
                    ...val,
                    issued_date: format(
                        new Date(val.issued_date),
                        "yyyy-MM-dd"
                    ),
                    valid_through:
                        val.valid_through !== ""
                            ? format(new Date(val.valid_through), "yyyy-MM-dd")
                            : "",
                    kyc: KYCData ? KYCData.id : "",
                };

                Object.entries(newValues).forEach((entry) => {
                    const [key, value] = entry;
                    if (value && key !== "file") {
                        formData.append(key, value.toString());
                    }
                });
                formData.append("file", val.file);
                mutate(formData, {
                    onSuccess: () => {
                        action.resetForm();
                        toast.success("Document added successfully");
                    },
                    onError: (error) => {
                        toast.error(error.message);
                    },
                });
            }}
        >
            {({
                isSubmitting,
                errors,
                touched,
                setFieldValue,
                resetForm,
                values,
            }) => (
                <Form>
                    {/* {<pre>{JSON.stringify(values, null, 4)}</pre>}
                    <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                    <h5>Identity Information</h5>

                    <Row>
                        <Col md={6}>
                            <SelectInputField
                                name="document_type"
                                labelName="Identity Type"
                                touch={touched.document_type}
                                error={errors.document_type}
                                placeHolder="Select Identity Type"
                                options={dropdownDocument}
                                // onchange={() => refetch()}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <InputField
                                name="document_id"
                                labelName="Document ID"
                                error={errors.document_id}
                                touch={touched.document_id}
                                placeHolder="Enter your Account Name"
                            />
                        </Col>
                        <Col md={6}>
                            <InputField
                                name="issuer_organization"
                                labelName=" Issuer Organization"
                                error={errors.issuer_organization}
                                touch={touched.issuer_organization}
                                placeHolder="Enter your Account Name"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <DatePickerField
                                name="issued_date"
                                labelName="Issued Date"
                                placeHolder="dd/mm/yy"
                                touch={touched.issued_date}
                                error={errors.issued_date}
                            />
                        </Col>
                        {values.document_type === "passport" ? (
                            <Col md={6}>
                                <DatePickerField
                                    name="valid_through"
                                    dateFormat="yyyy-MM-dd"
                                    labelName="Valid through"
                                    placeHolder="dd/mm/yy"
                                />
                            </Col>
                        ) : (
                            ""
                        )}
                    </Row>
                    <Col md={5}>
                        <CustomDropZone
                            name="file"
                            maxSize={200}
                            minSize={20}
                            onDrop={
                                (files) => setFieldValue("file", files[0])
                                // console.log(formData.get("file"))
                            }
                        />
                    </Col>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            className="me-3 mb-0 cancel-btn"
                            onClick={() => resetForm}
                        >
                            Cancel
                        </Button>
                        <FormButton
                            type="submit"
                            variant="primary"
                            name="Submit"
                            className="submit-btn"
                            isSubmitting={isSubmitting}
                            isSubmittingClass={isSubmittingClass(isSubmitting)}
                        />
                    </div>
                </Form>
            )}
        </Formik>
    );
};
