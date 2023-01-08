import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Alert, Radio } from "@mantine/core";
import { CheckCircle, ErrorOutlineOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    emailValidationSchema,
    phoneNumberValidationSchema,
} from "utils/formValidation/emailValidation";
import { isSubmittingClass } from "utils/helpers";

const ForgotPassword = () => {
    const [sendOnce, setSendOnce] = useState(false);
    const [choosedValue, setChoosedValue] = useState("email");
    const [successAlertMsg, setSuccessAlertMsg] = useState("");
    const [errorAlertMsg, setErrorAlertMsg] = useState("");
    const router = useRouter();
    const { mutate } = useForm("/user/reset/");

    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            welcomeText="Hey! No worries   👋"
            headerText="Forgot your password?"
            mainImg="/illustrations/forgot-pass.svg"
            redirectionLink="/login"
            currentPage="forgot-password"
            title="Forgot Password"
        >
            <div className="choose-email-or-phone mb-5">
                <Radio.Group
                    label="Please select email or phone number from which you want to reset your password"
                    onChange={(value) => setChoosedValue(value)}
                    size="md"
                    defaultValue="email"
                >
                    <Radio
                        value="email"
                        label="Email"
                        onClick={() => {
                            setSuccessAlertMsg("");
                            setErrorAlertMsg("");
                        }}
                    />
                    <Radio
                        value="phone"
                        label="Phone Number"
                        onClick={() => {
                            setSuccessAlertMsg("");
                            setErrorAlertMsg("");
                        }}
                    />
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
                    initialValues={{
                        email: "",
                        phone: "",
                    }}
                    validationSchema={
                        choosedValue === "email"
                            ? emailValidationSchema
                            : phoneNumberValidationSchema
                    }
                    onSubmit={(values, actions) => {
                        const formData = values.email
                            ? { email: values?.email }
                            : { phone: values?.phone };

                        mutate(formData, {
                            onSuccess: async (data: any) => {
                                actions.setSubmitting(false);
                                actions.resetForm();
                                setErrorAlertMsg("");
                                setSuccessAlertMsg(data?.message);

                                //       );
                                setSendOnce(true);
                                if (choosedValue === "phone") {
                                    router.push({
                                        pathname: "/otp-verify",
                                        query: { phone: values.phone },
                                    });
                                }
                            },
                            onError: (error: any) => {
                                actions.setSubmitting(false);
                                const {
                                    data: { email, phone },
                                } = error.response;

                                actions.setFieldError("email", email);
                                actions.setFieldError("phone", phone);
                                setSuccessAlertMsg("");
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
                                <PhoneNumberInput
                                    name="phone"
                                    labelName="Phone Number"
                                    touch={touched.phone}
                                    error={errors.phone}
                                />
                            )}
                            {successAlertMsg !== "" && (
                                <Alert
                                    icon={<CheckCircle />}
                                    title="Success"
                                    color="teal"
                                    className="mb-5"
                                >
                                    {successAlertMsg}
                                </Alert>
                            )}
                            {errorAlertMsg !== "" && (
                                <Alert
                                    icon={<ErrorOutlineOutlined />}
                                    title="Oops!"
                                    color="red"
                                    className="mb-5"
                                    withCloseButton={true}
                                    onClose={() => setErrorAlertMsg("")}
                                >
                                    {errorAlertMsg}
                                </Alert>
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
