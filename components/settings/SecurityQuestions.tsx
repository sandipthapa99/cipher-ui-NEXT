import FormButton from "@components/common/FormButton";
import PasswordField from "@components/common/PasswordField";
import { Form, Formik } from "formik";
import { useChangePassword } from "hooks/profile/changePassword/useChangePassword";
import { useData } from "hooks/use-data";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { ChangePasswordFromData } from "utils/formData";
import changePasswordFormSchema from "utils/formValidation/changePasswordFormValidation";
import { isSubmittingClass } from "utils/helpers";

export const SecurityQuestions = () => {
    const { mutate } = useChangePassword();
    const { data: securityQuestions } = useData(
        ["security-questions"],
        "/tasker/cms/security-question/"
    );
    console.log(securityQuestions);

    return (
        <section>
            <Formik
                initialValues={ChangePasswordFromData}
                validationSchema={changePasswordFormSchema}
                onSubmit={async (values, action) => {
                    const { old_password, new_password } = values;
                    mutate(
                        { old_password, new_password },
                        {
                            onSuccess: () => {
                                toast.success("Password changed successfully");
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
                {({ isSubmitting, errors, touched, resetForm }) => (
                    <Form autoComplete="off">
                        {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                        <PasswordField
                            name="old_password"
                            typeOf="password"
                            labelName="Current Password"
                            error={errors.old_password}
                            touch={touched.old_password}
                            placeHolder="Current Password"
                        />
                        <PasswordField
                            typeOf="password"
                            name="new_password"
                            labelName="New Password"
                            error={errors.new_password}
                            touch={touched.new_password}
                            placeHolder="New Password"
                        />
                        <PasswordField
                            name="confirm_password"
                            typeOf="password"
                            labelName="Confirm Password"
                            error={errors.confirm_password}
                            touch={touched.confirm_password}
                            placeHolder="Confirm Password"
                        />
                    </Form>
                )}
            </Formik>
        </section>
    );
};
