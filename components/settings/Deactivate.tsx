import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { Form, Formik } from "formik";
import React from "react";
import { useToggleSuccessModal } from "store/use-success-modal";
import { DeactivateFromData } from "utils/formData";
import { deactivateFormSchema } from "utils/formValidation/deactivateFormValidation";
import { isSubmittingClass } from "utils/helpers";

const dropdownCountryOptions = [
    { id: 1, label: "Nepal", value: "nepal" },
    { id: 2, label: "USA", value: "usa" },
    { id: 3, label: "Canda", value: "canda" },
];

const DeactivateAccount = () => {
    const toggleSuccessModal = useToggleSuccessModal();
    return (
        <div className="account-form">
            <h2>Deactivate</h2>
            <p>Close my account</p>
            <Formik
                initialValues={DeactivateFromData}
                validationSchema={deactivateFormSchema}
                onSubmit={async (values, action) => {
                    toggleSuccessModal();
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
                {({ isSubmitting, errors, touched }) => (
                    <Form autoComplete="off">
                        <SelectInputField
                            name="reason"
                            labelName="I am leaving because "
                            touch={touched.reason}
                            error={errors.reason}
                            fieldRequired
                            placeHolder="Select your country"
                            options={dropdownCountryOptions}
                        />
                        <SelectInputField
                            name="duration"
                            labelName="How Long"
                            touch={touched.duration}
                            error={errors.duration}
                            fieldRequired
                            placeHolder="Select your country"
                            options={dropdownCountryOptions}
                        />
                        <InputField
                            name="explaination"
                            labelName="Please explain further"
                            placeHolder="Enter your Bio"
                            as="textarea"
                        />

                        <FormButton
                            type="submit"
                            variant="primary"
                            name="Save"
                            className="submit-btn w-25"
                            isSubmitting={isSubmitting}
                            isSubmittingClass={isSubmittingClass(isSubmitting)}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DeactivateAccount;
