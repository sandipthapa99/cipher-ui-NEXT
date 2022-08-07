import DatePickerField from "@components/common/DateTimeField";
import DragDrop from "@components/common/DragDrop";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useSuccessContext } from "context/successContext/successContext";
import { Form, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { KYCFormData } from "utils/formData";
import { KYCFormSchema } from "utils/formValidation/kycFormValidationSchema";
import { isSubmittingClass } from "utils/helpers";

const dropdownCountryOptions = [
    { id: 1, label: "Nepal", value: "nepal" },
    { id: 2, label: "USA", value: "usa" },
    { id: 3, label: "Canda", value: "canda" },
];

const KYCForm = () => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <>
            {/* Modal component */}
            <div className="account-form mt-5">
                <h3>KYC Details</h3>
                <Formik
                    initialValues={KYCFormData}
                    validationSchema={KYCFormSchema}
                    onSubmit={async (values, action) => {
                        setShowSuccessModal(true);
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
                                name="fullName"
                                labelName="Name"
                                error={errors.fullName}
                                touch={touched.fullName}
                                placeHolder="Enter your Full Name"
                            />
                            <h5>Identity Information</h5>
                            <Col md={5}>
                                <SelectInputField
                                    name="identityType"
                                    labelName="Identity Type"
                                    touch={touched.identityType}
                                    error={errors.identityType}
                                    placeHolder="Select Identity Type"
                                    options={dropdownCountryOptions}
                                />
                            </Col>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        name="identityNumber"
                                        labelName="Identity Number"
                                        error={errors.identityNumber}
                                        touch={touched.identityNumber}
                                        placeHolder="Enter your identity Number"
                                    />
                                    <DatePickerField
                                        name="issuedDate"
                                        labelName="Issued date"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.issuedDate}
                                        error={errors.issuedDate}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <DatePickerField
                                        name="issuedFrom"
                                        labelName="Issued From"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.issuedFrom}
                                        error={errors.issuedFrom}
                                    />
                                    <DatePickerField
                                        name="expiryDate"
                                        labelName="Expiry Date"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.expiryDate}
                                        error={errors.expiryDate}
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
                                        name="panNumber"
                                        labelName="PAN Number"
                                        error={errors.panNumber}
                                        touch={touched.panNumber}
                                        placeHolder="Enter your Pan Number"
                                    />
                                    <DatePickerField
                                        name="panIssuedDate"
                                        labelName="Issued Date"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.panIssuedDate}
                                        error={errors.panIssuedDate}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <InputField
                                        type="text"
                                        name="issuedLoaction"
                                        labelName="Issued Loaction"
                                        error={errors.issuedLoaction}
                                        touch={touched.issuedLoaction}
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
                                    name="bankName"
                                    labelName="Bank Name"
                                    error={errors.bankName}
                                    touch={touched.bankName}
                                    placeHolder="Enter your Account Name"
                                />
                            </Col>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        name="bankAccountName"
                                        labelName="Bank Account Name"
                                        error={errors.bankAccountName}
                                        touch={touched.bankAccountName}
                                        placeHolder="Enter bank Account Name"
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <InputField
                                        type="text"
                                        name="bankAccountNumber"
                                        labelName="Bank Account Number"
                                        error={errors.bankAccountNumber}
                                        touch={touched.bankAccountNumber}
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
