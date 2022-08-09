import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import RadioField from "@components/common/RadioField";
import SelectInputField from "@components/common/SelectInputField";
import TagInputField from "@components/common/TagInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useSuccessContext } from "context/successContext/successContext";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { AccountFromData } from "utils/formData";
import { accountFormSchema } from "utils/formValidation/accountFormValidation";
import { isSubmittingClass } from "utils/helpers";

const dropdownCountryOptions = [
    { id: 1, label: "Nepal", value: "nepal" },
    { id: 2, label: "USA", value: "usa" },
    { id: 3, label: "Canda", value: "canda" },
];
const dropdownlangugeOptions = [
    { id: 1, label: "Nepal", value: "nepal" },
    { id: 2, label: "USA", value: "usa" },
    { id: 3, label: "Canda", value: "canda" },
];
const dropdownCurrencyOptions = [
    { id: 1, label: "Rupees", value: "rupees" },
    { id: 2, label: "Dollar", value: "dollar" },
    { id: 3, label: "CDollar", value: "cdollar" },
];
const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];
const experience = [
    { label: "I am Beginner", value: "beginner" },
    { label: "I am Intermediate", value: "intermediate" },
    { label: "I am Expert", value: "expert" },
];

const AccountForm = () => {
    const { setShowSuccessModal } = useSuccessContext();
    return (
        <>
            {/* Modal component */}
            <div className="account-form">
                <figure className="mx-auto">
                    <Image
                        src="/userprofile/profile.svg"
                        layout="fill"
                        alt="profile-pic"
                        className="rounded-circle"
                        objectFit="cover"
                    />
                </figure>
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
                            <InputField
                                type="email"
                                name="email"
                                labelName="Email"
                                error={errors.email}
                                touch={touched.email}
                                placeHolder="Enter your Email"
                            />
                            <InputField
                                name="bio"
                                labelName="Bio"
                                touch={touched.bio}
                                error={errors.bio}
                                placeHolder="Enter your Bio"
                                as="textarea"
                            />
                            <RadioField
                                type="radio"
                                name="gender"
                                variables={genders}
                                labelName="Are You?"
                                touch={touched.gender}
                                error={errors.gender}
                            />
                            <DatePickerField
                                name="dateOfBirth"
                                labelName="Date of birth"
                                placeHolder="dd/mm/yy"
                                touch={touched.dateOfBirth}
                                error={errors.dateOfBirth}
                            />
                            <hr />
                            <h3>Profession Information</h3>
                            <TagInputField
                                name="specialities"
                                error={errors.specialities}
                                touch={touched.specialities}
                                labelName="Specialities"
                                placeHolder="Enter your price"
                            />
                            <RadioField
                                type="radio"
                                name="experienceLevel"
                                variables={experience}
                                labelName="Experience Level"
                                touch={touched.experienceLevel}
                                error={errors.experienceLevel}
                            />
                            <h4>Active Hours</h4>
                            <Row className="g-5">
                                <Col md={3}>
                                    <DatePickerField
                                        name="activeHoursFrom"
                                        labelName="From"
                                        placeHolder="h/mm"
                                        dateFormat="h:mm aa"
                                        touch={touched.activeHoursFrom}
                                        error={errors.activeHoursFrom}
                                        timeOnly
                                    />
                                </Col>
                                <Col md={3}>
                                    <DatePickerField
                                        name="activeHoursTo"
                                        labelName="To"
                                        placeHolder="h/mm"
                                        dateFormat="h:mm aa"
                                        touch={touched.activeHoursTo}
                                        error={errors.activeHoursTo}
                                        timeOnly
                                    />
                                </Col>
                            </Row>
                            <h4>Select User Type</h4>
                            <div role="group" aria-labelledby="checkbox-group">
                                <label className="me-3">
                                    <Field
                                        type="checkbox"
                                        name="userType"
                                        value="Client"
                                        className="me-2"
                                    />
                                    Client
                                </label>
                                <label className="me-3">
                                    <Field
                                        type="checkbox"
                                        name="userType"
                                        className="me-2"
                                        value="Tasker"
                                    />
                                    Tasker
                                </label>
                            </div>
                            <hr />
                            <h3>Active Hours</h3>
                            <SelectInputField
                                name="country"
                                labelName="Country"
                                touch={touched.country}
                                error={errors.country}
                                placeHolder="Select your country"
                                options={dropdownCountryOptions}
                            />
                            <InputField
                                type="text"
                                name="addressLine1"
                                labelName="Address Line 1"
                                error={errors.addressLine1}
                                touch={touched.addressLine1}
                                placeHolder="Enter your price"
                            />
                            <InputField
                                type="text"
                                name="addressLine2"
                                labelName="Address Line 2"
                                error={errors.addressLine2}
                                touch={touched.addressLine2}
                                placeHolder="Enter your price"
                            />
                            <SelectInputField
                                name="language"
                                labelName="Language"
                                touch={touched.language}
                                error={errors.language}
                                placeHolder="Select your language"
                                options={dropdownlangugeOptions}
                            />
                            <SelectInputField
                                name="currency"
                                labelName="Currency"
                                touch={touched.currency}
                                error={errors.currency}
                                placeHolder="Select your currency"
                                options={dropdownCurrencyOptions}
                            />
                            <hr />
                            <h3>Profile Configurations</h3>
                            <SelectInputField
                                name="visibility"
                                labelName="Visibility"
                                touch={touched.visibility}
                                error={errors.visibility}
                                placeHolder="Select your visibility"
                                options={dropdownCurrencyOptions}
                            />
                            <SelectInputField
                                name="taskPreferences"
                                labelName="Task Preferences"
                                touch={touched.taskPreferences}
                                error={errors.taskPreferences}
                                placeHolder="Select your preferences"
                                options={dropdownCurrencyOptions}
                            />
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
export default AccountForm;
