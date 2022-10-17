import AuthenticationModalCard from "@components/AuthenticationModal";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
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
    clientEmailSignUpSchema,
    clientPhoneSignUpSchema,
} from "utils/formValidation/clientSignUpValidation";
import { isSubmittingClass } from "utils/helpers";

const SignUp = () => {
    const router = useRouter();
    const { mutate, isLoading } = useSignup();
    const [choosedValue, setChoosedValue] = useState("email");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    //for 2 factor modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            headerText="Sign Up"
            mainImg="/illustrations/rocket.svg"
            redirectionLink="/login"
            currentPage="client-signup"
        >
            <div className="cipher modals signup">
                <Formik
                    initialValues={ClientSignUpFormData}
                    validationSchema={
                        choosedValue === "email"
                            ? clientEmailSignUpSchema
                            : clientPhoneSignUpSchema
                    }
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
                                    if (choosedValue === "phone") {
                                        setShow(true);
                                    }

                                    if (choosedValue === "email") {
                                        router.push({ pathname: "/login" });
                                    }

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
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="login-form">
                            <div className="choose-email-or-phone mb-5">
                                <Radio.Group
                                    label="Sign Up Using:"
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
                                    fieldRequired={true}
                                    labelName="Email"
                                    touch={touched.email}
                                    error={errors.email}
                                    placeHolder="example@example.com"
                                />
                            ) : (
                                // <InputField
                                //     type="text"
                                //     name="phone"
                                //     labelName="Phone Number"
                                //     touch={touched.phone}
                                //     error={errors.phone}
                                //     placeHolder="+9779805284906"
                                // />
                                <PhoneNumberInput
                                    name={"phone"}
                                    fieldRequired={true}
                                    labelName="Phone Number"
                                    touch={touched.phone}
                                    error={errors.phone}
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
                <AuthenticationModalCard
                    show={show}
                    handleClose={handleClose}
                    phone={phoneNumber}
                    setShowForm={setShow}
                    scope="verify"
                />
            </div>
        </OnBoardingLayout>
    );
};

export default SignUp;
{
    /* <RadioField
                                type="radio"
                                name="gender"
                                labelName="Are You?"
                                touch={touched.gender}
                                error={errors.gender}
                            /> */
}
{
    /* <div className="form-group">
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
                            </div> */
}
{
    /* <div className="form-group">
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
                                        of Homaale.
                                    </label>
                                </div>
                            </div> */
}
