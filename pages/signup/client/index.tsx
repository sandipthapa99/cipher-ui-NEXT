import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Form, Formik } from "formik";
import { useSignup } from "hooks/auth/useSignup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { ClientSignUpFormData } from "utils/formData";
import clientSignUpSchema from "utils/formValidation/clientSignUpValidation";
import { isSubmittingClass } from "utils/helpers";

const SignUpAsClient = () => {
    const { mutate, isLoading } = useSignup();
    const router = useRouter();
    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            headerText="Signing up as a Client"
            mainImg="/illustrations/rocket.svg"
            redirectionLink="/login"
            currentPage="client-signup"
        >
            <div>
                <Formik
                    initialValues={ClientSignUpFormData}
                    validationSchema={clientSignUpSchema}
                    onSubmit={async (values) => {
                        const { email, password, confirmPassword } = values;
                        mutate(
                            { email, password, confirmPassword },
                            {
                                onSuccess: async () => {
                                    await router.push("/login");
                                    toast.success(
                                        "Please check your email for verification link"
                                    );
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            }
                        );
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="login-form">
                            <InputField
                                type="email"
                                name="email"
                                labelName="Email"
                                touch={touched.email}
                                error={errors.email}
                                placeHolder="Enter your email"
                            />
                            <PasswordField
                                type="password"
                                name="password"
                                labelName="Password"
                                touch={touched.password}
                                error={errors.password}
                                placeHolder="Password"
                            />
                            <PasswordField
                                type="password"
                                name="confirmPassword"
                                labelName="Confirm Password"
                                touch={touched.confirmPassword}
                                error={errors.confirmPassword}
                                placeHolder="Confirm Password"
                            />
                            {/* <RadioField
                                type="radio"
                                name="gender"
                                labelName="Are You?"
                                touch={touched.gender}
                                error={errors.gender}
                            /> */}
                            {/* <div className="form-group">
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="addToNewsletter"
                                        className={
                                            errors.addToNewsletter &&
                                            touched.addToNewsletter
                                                ? "form-check-input is-invalid"
                                                : "form-check-input"
                                        }
                                        id="isAgree"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="isAgree"
                                    >
                                        Send me emails relevant to me.
                                    </label>
                                </div>
                            </div> */}
                            {/* <div className="form-group">
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="isAgree"
                                        className={
                                            errors.isAgree && touched.isAgree
                                                ? "form-check-input is-invalid"
                                                : "form-check-input"
                                        }
                                        id="isAgree"
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="isAgree"
                                    >
                                        Yes, I agree to the
                                        <Link href="/terms-condition">
                                            <a target="_blank">
                                                {" "}
                                                terms and condition{" "}
                                            </a>
                                        </Link>
                                        of Cipher.
                                    </label>
                                </div>
                            </div> */}
                            <FormButton
                                type="submit"
                                variant="primary"
                                name={isLoading ? "Loading..." : "Continue"}
                                className="login-btn"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(
                                    isSubmitting
                                )}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
        </OnBoardingLayout>
    );
};

export default SignUpAsClient;
