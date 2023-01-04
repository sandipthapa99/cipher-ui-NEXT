import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import SelectInputField from "@components/common/SelectInputField";
import FileDropzone from "@components/common/SingleFileDropzone";
import { faCalendarDays } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useGetKYCDocument } from "hooks/profile/kyc/use-get-kyc-document";
import { useDocumentKYC } from "hooks/profile/kyc/use-Kyc-Document";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { Button, Col, Row } from "react-bootstrap";
import { KYCDocumentSchema } from "utils/formValidation/kycDocument";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";
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
    const { data: KYCData } = useGetKYC();
    const { mutate, isLoading } = useDocumentKYC();
    const { refetch } = useGetKYCDocument();

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
                imagePreviewUrl: [],
                file: [],
                issuer_organization: "",
                issued_date: "",
                valid_through: "",
                kyc: KYCData ? KYCData?.id : "",
            }}
            validationSchema={KYCDocumentSchema}
            onSubmit={async (val, action) => {
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
                    kyc: KYCData?.id,
                };

                Object.entries(newValues).forEach((entry) => {
                    const [key, value] = entry;
                    if (value && key !== "file") {
                        formData.append(key, value.toString());
                    }
                });
                formData.append("file", val.file[0]);
                mutate(formData, {
                    onSuccess: () => {
                        refetch();
                        //queryClient.invalidateQueries(["KYC-document"]);
                        action.resetForm();
                        toast.success("Your KYC is pending for approval");
                    },
                    onError: (error: any) => {
                        const {
                            data: { file },
                        } = error.response;
                        action.setFieldError("file", file && file[0]);
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
                setFieldTouched,
                resetForm,
                values,
            }) => (
                <Form>
                    <h5>Identity Information</h5>
                    <Row>
                        <Col md={6}>
                            <SelectInputField
                                name="document_type"
                                labelName="Identity Type"
                                fieldRequired
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
                                fieldRequired
                                touch={touched.document_id}
                                placeHolder="Enter your document number"
                            />
                        </Col>
                        <Col md={6}>
                            <InputField
                                name="issuer_organization"
                                labelName=" Issuer Organization"
                                fieldRequired
                                error={errors.issuer_organization}
                                touch={touched.issuer_organization}
                                placeHolder="Enter document Issuer Organization"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <MantineDateField
                                name="issued_date"
                                labelName="Issued Date"
                                placeHolder="dd/mm/yy"
                                fieldRequired
                                touch={touched.issued_date}
                                error={errors.issued_date}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faCalendarDays}
                                        className="svg-icons"
                                    />
                                }
                                maxDate={new Date()}
                                handleChange={(value) => {
                                    setFieldValue("issued_date", value);
                                }}
                            />
                        </Col>
                        {values.document_type === "passport" ? (
                            <Col md={6}>
                                {/* <DatePickerField
                                    name="valid_through"
                                    dateFormat="yyyy-MM-dd"
                                    labelName="Valid through"
                                    placeHolder="dd/mm/yy"
                                /> */}
                                <MantineDateField
                                    name="valid_through"
                                    labelName="Valid through"
                                    placeHolder="dd/mm/yy"
                                    fieldRequired
                                    touch={touched.issued_date}
                                    error={errors.issued_date}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faCalendarDays}
                                            className="svg-icons"
                                        />
                                    }
                                    minDate={new Date()}
                                    handleChange={(value) => {
                                        setFieldValue(
                                            "valid_through",
                                            format(
                                                new Date(value),
                                                "yyyy-MM-dd"
                                            )
                                        );
                                    }}
                                />
                            </Col>
                        ) : (
                            ""
                        )}
                    </Row>
                    <Col md={6}>
                        <FileDropzone
                            name={"file"}
                            accept={[
                                "image/png",
                                "image/jpeg",
                                "image/jpg",
                                "application/pdf",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                            ]}
                            imagePreview="imagePreviewUrl"
                            labelName="Verification Document"
                            onTouchStart={() => setFieldTouched("file", true)}
                            fieldRequired
                            error={errors.file as string}
                            touch={touched.file as unknown as boolean}
                            maxSize={1024 * 1024}
                            multiple={false}
                        />
                    </Col>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            className="me-3 mb-0 cancel-btn"
                            onClick={() => resetForm()}
                        >
                            Reset
                        </Button>

                        <FormButton
                            isLoading={isLoading ? true : false}
                            type="submit"
                            variant="primary"
                            name={isLoading ? "Loading..." : "Submit"}
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
