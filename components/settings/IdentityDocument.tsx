import { CustomDropZone } from "@components/common/CustomDropZone";
import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import SelectInputField from "@components/common/SelectInputField";
import { faCalendarDays } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useGetKYCDocument } from "hooks/profile/kyc/use-get-kyc-document";
import { useDocumentKYC } from "hooks/profile/kyc/use-Kyc-Document";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useRouter } from "next/router";
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
    const { data: KYCData } = useGetKYC();
    const { mutate, isLoading } = useDocumentKYC();
    const { data: KycDocuments, refetch } = useGetKYCDocument();
    const queryClient = new QueryClient();
    const router = useRouter();

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
                formData.append("file", val.file);
                mutate(formData, {
                    onSuccess: () => {
                        refetch();
                        //queryClient.invalidateQueries(["KYC-document"]);
                        action.resetForm();
                        toast.success("Your KYC is pending for approval");
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
                            {/* <DatePickerField
                                name="issued_date"
                                labelName="Issued Date"
                                placeHolder="dd/mm/yy"
                                touch={touched.issued_date}
                                error={errors.issued_date}
                            /> */}
                            <MantineDateField
                                name="issued_date"
                                labelName="Issued Date"
                                placeHolder="dd/mm/yy"
                                touch={touched.issued_date}
                                error={errors.issued_date}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faCalendarDays}
                                        className="svg-icons"
                                    />
                                }
                                // minDate={new Date()}
                                handleChange={(value) => {
                                    setFieldValue(
                                        "issued_date",
                                        format(new Date(value), "yyyy-MM-dd")
                                    );
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
                                    touch={touched.issued_date}
                                    error={errors.issued_date}
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faCalendarDays}
                                            className="svg-icons"
                                        />
                                    }
                                    // minDate={new Date()}
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
                    <Col md={5}>
                        <CustomDropZone
                            name="file"
                            maxSize={200}
                            minSize={20}
                            onDrop={(files) => setFieldValue("file", files[0])}
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
