import FormButton from "@components/common/FormButton";
import PasswordField from "@components/common/PasswordField";
import SwitchValue from "@components/common/SwitchValue";
import { PostCard } from "@components/PostTask/PostCard";
import { faPencil, faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSuccessContext } from "context/successContext/successContext";
import { Field, Form, Formik } from "formik";
import React from "react";
import Button from "react-bootstrap/Button";
import { ChangePasswordFromData } from "utils/formData";
import changePasswordFormSchema from "utils/formValidation/changePasswordFormValidation";
import { isSubmittingClass } from "utils/helpers";

const ChangePasswordForm = () => {
    const { setShowSuccessModal } = useSuccessContext();

    return (
        <>
            {/* Modal component */}
            <div className="account-form">
                <h2>Password</h2>
                <p>Password Configurations</p>
                <Formik
                    initialValues={ChangePasswordFromData}
                    validationSchema={changePasswordFormSchema}
                    onSubmit={async (values, action) => {
                        setShowSuccessModal(true);
                        console.log(values);
                        action.resetForm();
                    }}
                >
                    {({ isSubmitting, errors, touched, resetForm }) => (
                        <Form autoComplete="off">
                            <PasswordField
                                name="currentPassword"
                                typeOf="password"
                                labelName="Current Password"
                                error={errors.currentPassword}
                                touch={touched.currentPassword}
                                placeHolder="Current Password"
                            />
                            <PasswordField
                                typeOf="password"
                                name="newPassword"
                                labelName="New Password"
                                error={errors.newPassword}
                                touch={touched.newPassword}
                                placeHolder="New Password"
                            />
                            <PasswordField
                                typeOf="password"
                                name="confirmPassword"
                                labelName="Confirm Password"
                                touch={touched.confirmPassword}
                                error={errors.confirmPassword}
                                placeHolder="Confirm Password"
                            />
                            <h2 className="mt-5">2 Factor Authentication</h2>
                            <p>
                                Add an extra layer of security to block
                                unauthorized access and protect your account.
                            </p>
                            <h2>Authenticator App Code</h2>
                            <div className="d-flex justify-content-between security-toggle">
                                Enter a code generated by your authenticator app
                                to confirm it’s you.
                                <SwitchValue />
                            </div>
                            <h2>Authenticator App Code</h2>
                            <div className="d-flex justify-content-between security-toggle">
                                Receive a prompt from your mobile app to confirm
                                it’s you.
                                <SwitchValue />
                            </div>
                            <h2>Text Message</h2>
                            <div className="d-flex justify-content-between security-toggle">
                                Receive a four digit code by text message to
                                confirm it’s you.
                                <SwitchValue />
                            </div>
                            <div className="d-flex justify-content-between security-toggle">
                                <h2>Security Question</h2>
                                <FontAwesomeIcon icon={faPencil} />
                            </div>
                            <p className="mb-3 d-flex align-content-center">
                                <Field
                                    type="checkbox"
                                    name="toggle"
                                    className="checkbox me-2"
                                />{" "}
                                Enabled
                            </p>
                            <p>
                                Answer a question you choose to confirm it’s
                                you.
                            </p>
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
export default ChangePasswordForm;
