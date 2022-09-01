import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { faCommentAltCaptions } from "@fortawesome/pro-duotone-svg-icons";
import { Form, Formik } from "formik";
import { useSignup } from "hooks/auth/useSignup";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ClientSignUpFormData } from "utils/formData";
import {
    clientBothSignUpSchema,
    clientEmailSignUpSchema,
    clientPhoneSignUpSchema,
} from "utils/formValidation/clientSignUpValidation";
import { isSubmittingClass } from "utils/helpers";

const SignUpAsTasker = () => {
    const { mutate, isLoading } = useSignup();
    const [enteredData, setEnteredData] = useState("email");

    const getValidationSchema = () => {
        if (enteredData === "email") return clientEmailSignUpSchema;
        if (enteredData === "phone") return clientPhoneSignUpSchema;
        return clientBothSignUpSchema;
    };

    const handleFieldChange = (
        e: ChangeEvent<HTMLInputElement>,
        fieldName: string,
        setFieldValue: (field: string, value: any) => void
    ) => {
        setEnteredData(fieldName);
        setFieldValue(fieldName, e.currentTarget.value);
    };
    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            headerText="Signing up as a Tasker"
            mainImg="/illustrations/rocket.svg"
            redirectionLink="/login"
            currentPage="tasker-signup"
        >
            <div>
                <Formik
                    initialValues={ClientSignUpFormData}
                    validationSchema={getValidationSchema()}
                    onSubmit={async (values, actions) => {
                        const { password, confirmPassword, phone, email } =
                            values;

                        const payloadValue = () => {
                            if (!phone)
                                return { email, password, confirmPassword };

                            if (!email)
                                return { phone, password, confirmPassword };

                            return {
                                phone,
                                password,
                                confirmPassword,
                                email,
                            };
                        };
                        mutate(
                            { ...payloadValue() },
                            {
                                onError: (error) => {
                                    toast.error(error.message);
                                    actions.resetForm();
                                },
                                onSuccess: () => {
                                    toast.success(
                                        "Please check your email for verification link"
                                    );
                                    actions.resetForm();
                                },
                            }
                        );
                    }}
                >
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
                        <Form className="login-form">
                            <div className="form-group"></div>
                            {/* <RadioField
                                type="radio"
                                name="gender"
                                labelName="Signing up as?"
                                touch={touched.gender}
                                error={errors.gender}
                            />
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
                            /> */}
                            <InputField
                                type="email"
                                name="email"
                                labelName="Email"
                                onChange={(e) =>
                                    handleFieldChange(e, "email", setFieldValue)
                                }
                                touch={touched.email}
                                error={errors.email}
                                placeHolder="example@example.com"
                            />
                            <InputField
                                type="text"
                                name="phone"
                                labelName="Phone Number"
                                onChange={(e) =>
                                    handleFieldChange(e, "phone", setFieldValue)
                                }
                                touch={touched.phone}
                                error={errors.phone}
                                placeHolder="+9779805284906"
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

export default SignUpAsTasker;
