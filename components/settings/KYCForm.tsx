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
import { ImageVideoDragDop } from "staticData/dragDropContent";
import { AccountFromData } from "utils/formData";
import { accountFormSchema } from "utils/formValidation/accountFormValidation";
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
                    initialValues={AccountFromData}
                    validationSchema={accountFormSchema}
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
                                placeHolder="Enter your Name"
                            />
                            <h5>Identity Information</h5>
                            <Col md={5}>
                                <SelectInputField
                                    name="country"
                                    labelName="Country"
                                    touch={touched.country}
                                    error={errors.country}
                                    placeHolder="Select your country"
                                    options={dropdownCountryOptions}
                                />
                            </Col>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        type="text"
                                        name="fullName"
                                        labelName="Name"
                                        error={errors.fullName}
                                        touch={touched.fullName}
                                        placeHolder="Enter your Name"
                                    />
                                    <DatePickerField
                                        name="dateOfBirth"
                                        labelName="Date of birth"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.dateOfBirth}
                                        error={errors.dateOfBirth}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <DatePickerField
                                        name="dateOfBirth"
                                        labelName="Date of birth"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.dateOfBirth}
                                        error={errors.dateOfBirth}
                                    />
                                    <DatePickerField
                                        name="dateOfBirth"
                                        labelName="Date of birth"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.dateOfBirth}
                                        error={errors.dateOfBirth}
                                    />
                                </Col>
                            </Row>
                            <h4>Identity Card</h4>
                            <p>
                                Document can be Citizenship Card or Driving
                                License or Passport{" "}
                            </p>
                            <Col md={5}>
                                {ImageVideoDragDop &&
                                    ImageVideoDragDop.map((info) => (
                                        <DragDrop
                                            key={info.id}
                                            image={info.image}
                                            fileType={info.fileType}
                                            maxImageSize={info.maxImageSize}
                                            maxVideoSize={info.maxVideoSize}
                                        />
                                    ))}
                            </Col>
                            <hr />
                            <h5>PAN/VAT Information </h5>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        type="text"
                                        name="fullName"
                                        labelName="Name"
                                        error={errors.fullName}
                                        touch={touched.fullName}
                                        placeHolder="Enter your Name"
                                    />
                                    <DatePickerField
                                        name="dateOfBirth"
                                        labelName="Date of birth"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.dateOfBirth}
                                        error={errors.dateOfBirth}
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <DatePickerField
                                        name="dateOfBirth"
                                        labelName="Date of birth"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.dateOfBirth}
                                        error={errors.dateOfBirth}
                                    />
                                </Col>
                            </Row>
                            <h4>PAN/ VAT Card</h4>
                            <p>Document can be PAN or VAT Card </p>
                            <Col md={5}>
                                {ImageVideoDragDop &&
                                    ImageVideoDragDop.map((info) => (
                                        <DragDrop
                                            key={info.id}
                                            image={info.image}
                                            fileType={info.fileType}
                                            maxImageSize={info.maxImageSize}
                                            maxVideoSize={info.maxVideoSize}
                                        />
                                    ))}
                            </Col>
                            <hr />
                            <Row>
                                <Col lg={5} md={6}>
                                    <h5>Passport Size Photo</h5>
                                    <p>
                                        Upload your recent passport sized
                                        picture
                                    </p>
                                    {ImageVideoDragDop &&
                                        ImageVideoDragDop.map((info) => (
                                            <DragDrop
                                                key={info.id}
                                                image={info.image}
                                                fileType={info.fileType}
                                                maxImageSize={info.maxImageSize}
                                                maxVideoSize={info.maxVideoSize}
                                            />
                                        ))}
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <h5>Address Verification Document</h5>
                                    <p>
                                        Document can be Electricity Bill, Water
                                        Bill, Rental Aggrement.
                                    </p>
                                    {ImageVideoDragDop &&
                                        ImageVideoDragDop.map((info) => (
                                            <DragDrop
                                                key={info.id}
                                                image={info.image}
                                                fileType={info.fileType}
                                                maxImageSize={info.maxImageSize}
                                                maxVideoSize={info.maxVideoSize}
                                            />
                                        ))}
                                </Col>
                            </Row>
                            <hr />
                            <h5>Bank Details (Optional)</h5>
                            <Col md={5}>
                                <InputField
                                    type="text"
                                    name="fullName"
                                    labelName="Name"
                                    error={errors.fullName}
                                    touch={touched.fullName}
                                    placeHolder="Enter your Name"
                                />
                            </Col>
                            <Row>
                                <Col lg={5} md={6}>
                                    <InputField
                                        type="text"
                                        name="fullName"
                                        labelName="Name"
                                        error={errors.fullName}
                                        touch={touched.fullName}
                                        placeHolder="Enter your Name"
                                    />
                                </Col>
                                <Col lg={{ span: 5, offset: 2 }} md={6}>
                                    <DatePickerField
                                        name="dateOfBirth"
                                        labelName="Date of birth"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.dateOfBirth}
                                        error={errors.dateOfBirth}
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
