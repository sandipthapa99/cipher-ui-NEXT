import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Radio } from "@mantine/core";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { useToggleSuccessModal } from "store/use-success-modal";
import {
    emailValidationSchema,
    phoneNumberValidationSchema,
} from "utils/formValidation/emailValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

const ForgotPassword = () => {
    const [sendOnce, setSendOnce] = useState(false);
    const [choosedValue, setChoosedValue] = useState("email");
    const router = useRouter();
    const { mutate } = useForm("/user/reset/");
    const toggleSuccessModal = useToggleSuccessModal();

    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            welcomeText="Hey! No worries   👋"
            headerText="Forgot your password?"
            mainImg="/illustrations/forgot-pass.svg"
            redirectionLink="/login"
            currentPage="forgot-password"
        >
            <div className="choose-email-or-phone mb-5">
                <Radio.Group
                    label="Please select email or phone number from which you want to reset your password"
                    onChange={(value) => setChoosedValue(value)}
                    size="md"
                    defaultValue="email"
                >
                    <Radio value="email" label="Email" />
                    <Radio value="phone" label="Phone Number" />
                </Radio.Group>
            </div>

            <>
                {choosedValue === "email" ? (
                    <p className="forgot-pass-description">
                        Enter the email associated with your account and
                        we&apos;ll send an email with instructions to reset your
                        password.
                    </p>
                ) : (
                    <p className="forgot-pass-description">
                        Enter the phone number associated with your account and
                        we&apos;ll send an OTP code to your phone number
                    </p>
                )}
                <Formik
                    initialValues={{ email: "", phone: "" }}
                    validationSchema={
                        choosedValue === "email"
                            ? emailValidationSchema
                            : phoneNumberValidationSchema
                    }
                    onSubmit={async (values, actions) => {
                        const formData = values.email
                            ? { email: values?.email }
                            : { phone: values?.phone };
                        mutate(formData, {
                            onSuccess: async () => {
                                actions.resetForm();
                                toggleSuccessModal();
                                choosedValue === "email"
                                    ? toast.success(
                                          "Reset link has been sent to your email. Please visit that link"
                                      )
                                    : toast.success(
                                          "An OTP has been sent to your mobile number .. please enter that otp and new password"
                                      );
                                setSendOnce(true);
                                if (choosedValue === "phone") {
                                    router.push({
                                        pathname: "/otp-verify",
                                        query: { phone: values.phone },
                                    });
                                }
                            },
                            onError: (error) => {
                                toast.error("please enter valid user");
                            },
                        });
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="login-form">
                            {choosedValue === "email" ? (
                                <InputField
                                    type="email"
                                    name="email"
                                    labelName="Email"
                                    touch={touched.email}
                                    error={errors.email}
                                    placeHolder="example@example.com"
                                />
                            ) : (
                                <InputField
                                    type="text"
                                    name="phone"
                                    labelName="Phone Number"
                                    touch={touched.phone}
                                    error={errors.phone}
                                    placeHolder="+9779805284906"
                                />
                            )}
                            {!sendOnce ? (
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
                            ) : (
                                <FormButton
                                    type="submit"
                                    variant="primary"
                                    name="Resend"
                                    className="login-btn"
                                    isSubmitting={isSubmitting}
                                    isSubmittingClass={isSubmittingClass(
                                        isSubmitting
                                    )}
                                />
                            )}
                        </Form>
                    )}
                </Formik>
            </>
        </OnBoardingLayout>
    );
};
export default ForgotPassword;
