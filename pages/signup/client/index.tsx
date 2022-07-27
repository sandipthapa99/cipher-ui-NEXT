import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import RadioField from "@components/common/RadioField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { useAuthContext } from "context/AuthContext/userContext";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { ClientSignUpFormData } from "utils/formData";
import clientSignUpSchema from "utils/formValidation/clientSignUpValidation";
import { isSubmittingClass } from "utils/helpers";

const SignUpAsClient = () => {
    const {signUpUser} = useAuthContext()
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

                        signUpUser(values)
                        
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="login-form">
                            <InputField
                                type="text"
                                name="firstName"
                                labelName="First Name"
                                touch={touched.firstName}
                                error={errors.firstName}
                                placeHolder="Lisa"
                            />
                            <InputField
                                type="text"
                                name="lastName"
                                labelName="Last Name"
                                touch={touched.lastName}
                                error={errors.lastName}
                                placeHolder="Lisa"
                            />
                            <InputField
                                type="email"
                                name="email"
                                labelName="Email or phone number"
                                touch={touched.email}
                                error={errors.email}
                                placeHolder="example@example.com"
                            />
                            <InputField
                                type="text"
                                name="phoneNumber"
                                labelName="Phone Number"
                                touch={touched.phoneNumber}
                                error={errors.phoneNumber}
                                placeHolder="+00 420 420 4200"
                            />
                            <PasswordField
                                type="password"
                                name="password"
                                labelName="Password"
                                touch={touched.password}
                                error={errors.password}
                                placeHolder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
                            />
                            <PasswordField
                                type="password"
                                name="confirmPassword"
                                labelName="Confirm Password"
                                touch={touched.confirmPassword}
                                error={errors.confirmPassword}
                                placeHolder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
                            />
                            <RadioField
                                type="radio"
                                name="gender"
                                labelName="Are You?"
                                touch={touched.gender}
                                error={errors.gender}
                            />
                            <div className="form-group">
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
                            </div>
                            <div className="form-group">
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
                            </div>
                            <FormButton
                                type="submit"
                                variant="primary"
                                name="Continue"
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
