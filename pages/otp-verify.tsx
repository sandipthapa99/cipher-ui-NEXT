import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import { useToggleSuccessModal } from "store/use-success-modal";
import { resetFormSchema } from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

const VerifyOtp = () => {
    const router = useRouter();
    const toggleSuccessModal = useToggleSuccessModal();

    const phone = router.query.phone;

    const { mutate } = useForm("/user/reset/otp/verify/");
    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            welcomeText="Hey! No worries   👋"
            headerText="Reset your password?"
            mainImg="/illustrations/forgot-pass.svg"
            currentPage="reset-password"
            redirectionLink="/login"
            title="OTP Verification"
        >
            <Formik
                initialValues={{
                    otp: "",
                    password: "",
                    confirm_password: "",
                    scope: "reset",
                }}
                validationSchema={resetFormSchema}
                onSubmit={async (values, actions) => {
                    mutate(
                        { phone, ...values },
                        {
                            onSuccess: async () => {
                                actions.resetForm();
                                toggleSuccessModal();
                                toast.success(
                                    "Successfully Changed your password. Please login with the changed password"
                                );
                                router.push({
                                    pathname: "/login",
                                });
                            },
                            onError: (error: any) => {
                                const { otp, password } = error.response.data;
                                actions.setFieldError("otp", otp && otp[0]);
                                actions.setFieldError(
                                    "password",
                                    password && password[0]
                                );
                            },
                        }
                    );
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="login-form">
                        <InputField
                            name="otp"
                            labelName={"OTP Code"}
                            type="text"
                            touch={touched.otp}
                            error={errors.otp}
                            placeHolder={"Six digits OTP"}
                        />
                        <PasswordField
                            type="password"
                            name="password"
                            labelName="Password"
                            touch={touched.password}
                            error={errors.password}
                            placeHolder="New Password"
                        />
                        <PasswordField
                            type="password"
                            name="confirm_password"
                            labelName="Confirm Password"
                            touch={touched.confirm_password}
                            error={errors.confirm_password}
                            placeHolder="Confirm New Password"
                        />
                        <FormButton
                            type="submit"
                            variant="primary"
                            name="Reset"
                            className="login-btn"
                            isSubmitting={isSubmitting}
                            isSubmittingClass={isSubmittingClass(isSubmitting)}
                        />
                    </Form>
                )}
            </Formik>
        </OnBoardingLayout>
    );
};

export default VerifyOtp;
