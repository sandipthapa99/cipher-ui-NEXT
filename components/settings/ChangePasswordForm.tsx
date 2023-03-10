import FormButton from "@components/common/FormButton";
import PasswordField from "@components/common/PasswordField";
import { PostCard } from "@components/PostTask/PostCard";
import { Accordion } from "@mantine/core";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { useChangePassword } from "hooks/profile/changePassword/useChangePassword";
import Cookies from "js-cookie";
import React from "react";
import Button from "react-bootstrap/Button";
import changePasswordFormSchema from "utils/formValidation/changePasswordFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

import { ChangeNewEmail } from "./changeNewEmail";
import { ChangePhoneNumber } from "./changePhonenumber";
import { SecurityQuestions } from "./SecurityQuestions";

const ChangePasswordForm = () => {
    const { mutate } = useChangePassword();
    const { data: userDetails } = useUser();

    const googleToken = Cookies.get("credentials");

    return (
        <>
            <Accordion
                variant="separated"
                defaultValue="change-password"
                aria-expanded={true}
                radius="md"
                styles={{
                    item: {
                        backgroundColor: "#fff",
                    },
                }}
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
                                initialValues={{
                                    new_password: "",
                                    social_token: googleToken
                                        ? googleToken
                                        : null,
                                    confirm_password: "",
                                    old_password: null,
                                }}
                                // validationSchema={changePasswordFormSchema}
                                onSubmit={async (values, action) => {
                                    mutate(values, {
                                        onSuccess: () => {
                                            toast.success(
                                                "Password changed successfully"
                                            );
                                            action.resetForm();
                                        },
                                        onError: (error: any) => {
                                            const {
                                                old_password,
                                                new_password,
                                                confirm_password,
                                            } = error.response.data;
                                            action.setFieldError(
                                                "old_password",
                                                old_password && old_password[0]
                                            );
                                            action.setFieldError(
                                                "new_password",
                                                new_password && new_password[0]
                                            );
                                            action.setFieldError(
                                                "confirm_password",
                                                confirm_password &&
                                                    confirm_password[0]
                                            );
                                        },
                                    });
                                }}
                            >
                                {({
                                    isSubmitting,
                                    errors,
                                    touched,
                                    dirty,
                                    resetForm,
                                }) => (
                                    <Form autoComplete="off">
                                        {!userDetails?.social_only && (
                                            <PasswordField
                                                typeOf="password"
                                                name="old_password"
                                                labelName="Old Password"
                                                error={errors.old_password}
                                                touch={touched.old_password}
                                                placeHolder="Old Password"
                                                fieldRequired
                                            />
                                        )}
                                        <PasswordField
                                            typeOf="password"
                                            name="new_password"
                                            labelName="New Password"
                                            error={errors.new_password}
                                            touch={touched.new_password}
                                            placeHolder="New Password"
                                            // fieldRequired
                                        />

                                        <PasswordField
                                            name="confirm_password"
                                            typeOf="password"
                                            labelName="Confirm Password"
                                            error={errors.confirm_password}
                                            touch={touched.confirm_password}
                                            placeHolder="Confirm Password"
                                            // fieldRequired
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
                                                // disabled={!dirty}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Accordion.Panel>
                </Accordion.Item>
                {!userDetails?.social_only && (
                    <Accordion.Item value="phone-number">
                        <Accordion.Control>
                            <p className="m-0 font-weight-normal">
                                {userDetails?.phone === null
                                    ? "Add new phone number"
                                    : "Change Phone Number"}
                            </p>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <ChangePhoneNumber />
                        </Accordion.Panel>
                    </Accordion.Item>
                )}

                {!userDetails?.social_only && (
                    <Accordion.Item value="email-address">
                        <Accordion.Control>
                            <p className="m-0 font-weight-normal">
                                {userDetails?.email === ""
                                    ? "Add new email"
                                    : "Update Email"}
                            </p>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <ChangeNewEmail />
                        </Accordion.Panel>
                    </Accordion.Item>
                )}

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
            />
        </>
    );
};
export default ChangePasswordForm;
