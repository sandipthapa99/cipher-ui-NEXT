import AuthenticationModalCard from "@components/AuthenticationModal";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Radio } from "@mantine/core";
import { Form, Formik } from "formik";
import { useSignup } from "hooks/auth/useSignup";
import { useRouter } from "next/router";
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

const SignUpAsClient = () => {
    const { mutate, isLoading } = useSignup();
    const [enteredData, setEnteredData] = useState("email");
    const [choosedValue, setChoosedValue] = useState("email");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
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
    const router = useRouter();

    //for 2 factor modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

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
                    validationSchema={getValidationSchema()}
                    onSubmit={async (values) => {
                        const { email, password, confirmPassword, phone } =
                            values;
                        values.phone ? setPhoneNumber(values.phone) : null;
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
                                onSuccess: async () => {
                                    // await router.push("/login");
                                    choosedValue === "phone"
                                        ? setShow(true)
                                        : null;

                                    choosedValue === "email"
                                        ? toast.success(
                                              "Check your email and click the link to verify your registration."
                                          )
                                        : toast.success(
                                              "An OTP has been sent to your mobile number.Please enter that otp and new password"
                                          );
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            }
                        );
                    }}
                >
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
                        <Form className="login-form">
                            <div className="choose-email-or-phone mb-5">
                                <Radio.Group
                                    label="Please select one for Signup process Email Or Phone Number"
                                    onChange={(value) => setChoosedValue(value)}
                                    size="md"
                                    defaultValue="email"
                                >
                                    <Radio value="email" label="Email" />
                                    <Radio value="phone" label="Phone Number" />
                                </Radio.Group>
                            </div>
                            {choosedValue === "email" ? (
                                <InputField
                                    type="email"
                                    name="email"
                                    labelName="Email"
                                    onChange={(e) =>
                                        handleFieldChange(
                                            e,
                                            "email",
                                            setFieldValue
                                        )
                                    }
                                    touch={touched.email}
                                    error={errors.email}
                                    placeHolder="example@example.com"
                                />
                            ) : (
                                <InputField
                                    type="text"
                                    name="phone"
                                    labelName="Phone Number"
                                    onChange={(e) => {
                                        // console.log("values=", e.target.value);
                                        handleFieldChange(
                                            e,
                                            "phone",
                                            setFieldValue
                                        );
                                    }}
                                    touch={touched.phone}
                                    error={errors.phone}
                                    placeHolder="+9779805284906"
                                />
                            )}

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
                                name={isLoading ? "Loading..." : "Sign Up"}
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
            <AuthenticationModalCard
                show={show}
                handleClose={handleClose}
                username={phoneNumber}
            />
        </OnBoardingLayout>
    );
};

export default SignUpAsClient;
