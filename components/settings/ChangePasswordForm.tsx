import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import SwitchValue from "@components/common/SwitchValue";
import { PostCard } from "@components/PostTask/PostCard";
import { faPencil, faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "@mantine/core";
import { Field, Form, Formik } from "formik";
import { useChangePassword } from "hooks/profile/changePassword/useChangePassword";
import React from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import { ChangePasswordFromData } from "utils/formData";
import changePasswordFormSchema from "utils/formValidation/changePasswordFormValidation";
import { isSubmittingClass } from "utils/helpers";

import { ChangeNewEmail } from "./changeNewEmail";
import { ChangePhoneNumber } from "./changePhonenumber";
import { SecurityQuestions } from "./SecurityQuestions";

const ChangePasswordForm = () => {
    const toggleSuccessModal = useToggleSuccessModal();
    const { mutate } = useChangePassword();

    return (
        <>
            <Accordion
                variant="separated"
                defaultValue="change-password"
                aria-expanded={true}
                radius="md"
            >
                <Accordion.Item value="change-password">
                    <Accordion.Control className="m-0">
                        <p className="m-0 font-weight-normal">
                            Change Password
                        </p>
                    </Accordion.Control>
                    <Accordion.Panel className="p-0">
                        <div className="p-0">
                            <Formik
                                initialValues={ChangePasswordFromData}
                                validationSchema={changePasswordFormSchema}
                                onSubmit={async (values, action) => {
                                    const { old_password, new_password } =
                                        values;
                                    mutate(
                                        { old_password, new_password },
                                        {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Password changed successfully"
                                                );
                                                toggleSuccessModal();
                                            },
                                            onError: (err) => {
                                                toast.error(err.message);
                                            },
                                        }
                                    );

                                    console.log(values);
                                    action.resetForm();
                                }}
                            >
                                {({
                                    isSubmitting,
                                    errors,
                                    touched,
                                    resetForm,
                                }) => (
                                    <Form autoComplete="off">
                                        <PasswordField
                                            typeOf="password"
                                            name="new_password"
                                            labelName="New Password"
                                            error={errors.new_password}
                                            touch={touched.new_password}
                                            placeHolder="New Password"
                                            fieldRequired
                                        />
                                        <PasswordField
                                            typeOf="password"
                                            name="old_password"
                                            labelName="Old Password"
                                            error={errors.old_password}
                                            touch={touched.old_password}
                                            placeHolder="Old Password"
                                            fieldRequired
                                        />
                                        <PasswordField
                                            name="confirm_password"
                                            typeOf="password"
                                            labelName="Confirm Password"
                                            error={errors.confirm_password}
                                            touch={touched.confirm_password}
                                            placeHolder="Confirm Password"
                                            fieldRequired
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
                                                name="Update"
                                                className="submit-btn"
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
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="phone-number">
                    <Accordion.Control>
                        <p className="m-0 font-weight-normal">
                            Change Phone Number
                        </p>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <ChangePhoneNumber />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="email-address">
                    <Accordion.Control>
                        <p className="m-0 font-weight-normal">
                            Change Email Address
                        </p>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <ChangeNewEmail />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="security">
                    <Accordion.Control>
                        <p className="m-0 font-weight-normal">
                            Security Questions
                        </p>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <SecurityQuestions />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

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
