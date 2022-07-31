import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Form, Formik } from "formik";
import { withAuth } from "utils/Auth/withAuth";
import emailValidationSchema from "utils/formValidation/emailValidation";
import { isSubmittingClass } from "utils/helpers";

const ForgotPassword = () => {
    return (
        <section>
            <OnBoardingLayout
                topLeftText="Already have an account ?"
                topRightText="Login"
                welcomeText="Hey! No worries   👋"
                headerText="Forgot your password?"
                mainImg="/illustrations/forgot-pass.svg"
                redirectionLink="/login"
                currentPage="forgot-password"
            >
                <p className="forgot-pass-description">
                    Enter the email associated with your account and we&apos;ll
                    send an email with instructions to reset your password.
                </p>
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={emailValidationSchema}
                    onSubmit={async (values, actions) => {
                        console.log(values, actions);
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="login-form">
                            <InputField
                                type="email"
                                name="email"
                                labelName="Email or phone number"
                                touch={touched.email}
                                error={errors.email}
                                placeHolder="example@example.com"
                            />
                            <FormButton
                                type="submit"
                                variant="primary"
                                name="Send"
                                className="login-btn"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(
                                    isSubmitting
                                )}
                            />
                        </Form>
                    )}
                </Formik>
            </OnBoardingLayout>
        </section>
    );
};
export default ForgotPassword;
