import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import TagInputField from "@components/common/TagInputField";
import { Form, Formik } from "formik";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { AccountFromData } from "utils/formData";
import { profileEditFormSchema } from "utils/formValidation/profileEditFormValidation";
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

const AccountForm = () => {
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
                    validationSchema={profileEditFormSchema}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
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
                                labelName="email"
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
                            <InputField
                                type="text"
                                name="gender"
                                labelName="Are You ?"
                                error={errors.gender}
                                touch={touched.gender}
                                placeHolder="Enter your price"
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
                            <InputField
                                type="text"
                                name="experienceLevel"
                                labelName="experienceLevel"
                                error={errors.experienceLevel}
                                touch={touched.experienceLevel}
                                placeHolder="Enter your price"
                            />
                            <h3>Active Hours</h3>
                            <Row className="g-5">
                                <Col md={3}>
                                    <DatePickerField
                                        name="activeHoursFrom"
                                        labelName="From"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.activeHoursFrom}
                                        error={errors.activeHoursFrom}
                                    />
                                </Col>
                                <Col md={3}>
                                    <DatePickerField
                                        name="activeHoursTo"
                                        labelName="To"
                                        placeHolder="dd/mm/yy"
                                        touch={touched.activeHoursTo}
                                        error={errors.activeHoursTo}
                                    />
                                </Col>
                            </Row>
                            <InputField
                                type="text"
                                name="userType"
                                labelName="Select User Type"
                                error={errors.userType}
                                touch={touched.userType}
                                placeHolder="Enter your price"
                            />
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
                            <FormButton
                                type="submit"
                                variant="primary"
                                name="Apply"
                                className="submit-btn w-25"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(
                                    isSubmitting
                                )}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
export default AccountForm;
