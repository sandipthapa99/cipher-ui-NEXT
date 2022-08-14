import DatePickerField from "@components/common/DateTimeField";
import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useKYC } from "hooks/profile/kyc/useKYC";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import { KYCFormSchema } from "utils/formValidation/kycFormValidationSchema";
import { isSubmittingClass } from "utils/helpers";

const dropdownCountryOptions = [
    { id: 1, label: "Nepal", value: "nepal" },
    { id: 2, label: "USA", value: "usa" },
    { id: 3, label: "Canda", value: "canda" },
];

const KYCForm = () => {
    const toggleSuccessModal = useToggleSuccessModal();
    const { data: KYCData } = useGetKYC();
    console.log(KYCData);
    const { mutate } = useKYC();

    return (
        <>
            {/* Modal component */}
            <div className="account-form mt-5">
                <h3>KYC Details</h3>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        full_name: KYCData?.full_name ?? "",
                        identity_type: KYCData?.identity_type ?? "",
                        identity_id: KYCData?.identity_id ?? "",
                        identity_issued_date: "",
                        identity_valid_through: "",
                        identity_issuer_organization:
                            KYCData?.identity_issuer_organization ?? "",
                        // identity_card_file: "",
                        pan_number: KYCData?.pan_number ?? null,
                        pan_issued_from: KYCData?.pan_issued_from ?? "",
                        pan_issued_date: "",
                        pan_card_file: null,
                        passport_size_photo: null,
                        personal_address_verification_document: null,
                        bank_name: KYCData?.bank_name ?? "",
                        bank_account_name: KYCData?.bank_account_name ?? "",
                        bank_account_number: KYCData?.bank_account_number ?? "",
                    }}
                    validationSchema={KYCFormSchema}
                    onSubmit={async (values, action) => {
                        console.log(values);
                        const newvalidatedValue = {
                            ...values,
                            identity_issued_date: format(
                                new Date(values.identity_issued_date),
                                "yyyy-MM-dd"
                            ),
                            identity_valid_through: format(
                                new Date(values.identity_valid_through),
                                "yyyy-MM-dd"
                            ),
                            pan_issued_date: format(
                                new Date(values.pan_issued_date),
                                "yyyy-MM-dd"
                            ),
                        };

                        mutate(newvalidatedValue, {
                            onSuccess: () => {
                                toggleSuccessModal();
                            },
                            onError: (error) => {
                                toast.error(error.message);
                            },
                        });
                        // To be used for API
                        // try {
                        //     axiosClient.post("/routes", values);
                        // } catch (error: any) {
                        //     error.response.data.message;
                        // }
                        console.log(values);
                        action.resetForm();
                    }}
                >
                    {({ isSubmitting, errors, touched, resetForm }) => (
                        <Form autoComplete="off">
                            <InputField
                                type="text"
                                name="full_name"
                                labelName="Name"
                                error={errors.full_name}
                                touch={touched.full_name}
                                placeHolder="Enter your Full Name"
                            />
                            <h5>Identity Information</h5>
                            <Col md={5}>
                                <SelectInputField
                                    name="identity_type"
                                    labelName="Identity Type"
                                    touch={touched.identity_type}
                                    error={errors.identity_type}
                                    placeHolder="Select Identity Type"
                                    options={dropdownCountryOptions}
                                />
                            </Col>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        name="identity_id"
                                        labelName="Identity Number"
                                        error={errors.identity_id}
                                        touch={touched.identity_id}
                                        placeHolder="Enter your identity Number"
                                    />
                                    <DatePickerField
                                        name="identity_issued_date"
                                        labelName="Issued date"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.identity_issued_date}
                                        error={errors.identity_issued_date}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <InputField
                                        name="identity_issuer_organization"
                                        labelName="Issued From"
                                        placeHolder="dd/mm/yy"
                                        touch={
                                            touched.identity_issuer_organization
                                        }
                                        error={
                                            errors.identity_issuer_organization
                                        }
                                    />
                                    <DatePickerField
                                        name="identity_valid_through"
                                        labelName="Expiry Date"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.identity_valid_through}
                                        error={errors.identity_valid_through}
                                    />
                                </Col>
                            </Row>
                            <h4>Identity Card</h4>
                            <p>
                                Document can be Citizenship Card or Driving
                                License or Passport{" "}
                            </p>
                            <Col md={5}>
                                <DragDrop
                                    image="/service-details/file-upload.svg"
                                    fileType="Image/Video"
                                    maxImageSize={20}
                                    maxVideoSize={200}
                                />
                            </Col>
                            <hr />
                            <h5>PAN/VAT Information </h5>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        type="text"
                                        name="pan_number"
                                        labelName="PAN Number"
                                        error={errors.pan_number}
                                        touch={touched.pan_number}
                                        placeHolder="Enter your Pan Number"
                                    />
                                    <DatePickerField
                                        name="pan_issued_date"
                                        labelName="Issued Date"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.pan_issued_date}
                                        error={errors.pan_issued_date}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <InputField
                                        type="text"
                                        name="pan_issued_from"
                                        labelName="Issued Loaction"
                                        error={errors.pan_issued_from}
                                        touch={touched.pan_issued_from}
                                        placeHolder="Enter your Issued Loaction"
                                    />
                                </Col>
                            </Row>
                            <h4>PAN/ VAT Card</h4>
                            <p>Document can be PAN or VAT Card </p>
                            <Col md={5}>
                                <DragDrop
                                    image="/service-details/file-upload.svg"
                                    fileType="Image/Video"
                                    maxImageSize={20}
                                    maxVideoSize={200}
                                />
                            </Col>
                            <hr />
                            <Row>
                                <Col lg={5} md={6}>
                                    <h5>Passport Size Photo</h5>
                                    <p>
                                        Upload your recent passport sized
                                        picture
                                    </p>
                                    <DragDrop
                                        image="/service-details/file-upload.svg"
                                        fileType="Image/Video"
                                        maxImageSize={20}
                                        maxVideoSize={200}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <h5>Address Verification Document</h5>
                                    <p>
                                        Document can be Electricity Bill, Water
                                        Bill, Rental Aggrement.
                                    </p>
                                    <DragDrop
                                        image="/service-details/file-upload.svg"
                                        fileType="Image/Video"
                                        maxImageSize={20}
                                        maxVideoSize={200}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <h5>Bank Details (Optional)</h5>
                            <Col md={5}>
                                <InputField
                                    name="bank_name"
                                    labelName="Bank Name"
                                    error={errors.bank_name}
                                    touch={touched.bank_name}
                                    placeHolder="Enter your Account Name"
                                />
                            </Col>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        name="bank_account_name"
                                        labelName="Bank Account Name"
                                        error={errors.bank_account_name}
                                        touch={touched.bank_account_name}
                                        placeHolder="Enter bank Account Name"
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <InputField
                                        type="text"
                                        name="bank_account_number"
                                        labelName="Bank Account Number"
                                        error={errors.bank_account_number}
                                        touch={touched.bank_account_number}
                                        placeHolder="Enter your Account Number"
                                    />
                                </Col>
                            </Row>
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
                                    name="Save"
                                    className="submit-btn w-25"
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
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};
export default KYCForm;
