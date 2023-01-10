import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { axiosClient } from "utils/axiosClient";
import { emailResendSchema } from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

interface ResendEmailVerification {
    email: string;
}

const ResendVerification = () => {
    const router = useRouter();

    const resendEmailVerificationMutation = useMutation(
        (data: ResendEmailVerification) => {
            return axiosClient.post(`/user/resend/email/activation/`, data);
        }
    );

    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            welcomeText="Hey! No worries   👋"
            headerText="Resend Verification"
            mainImg="/illustrations/forgot-pass.svg"
            redirectionLink="/login"
            currentPage="forgot-password"
            title="Resend Verification"
        >
            <Formik
                initialValues={{ email: "" }}
                validationSchema={emailResendSchema}
                onSubmit={async (values, actions) => {
                    resendEmailVerificationMutation.mutate(values, {
                        onSuccess: async () => {
                            actions.resetForm();
                            toast.success(
                                "Email Verification link as been sent to your account."
                            );
                            router.push({
                                pathname: "/login",
                            });
                        },
                        onError: (error: any) => {
                            const { data } = error.response;
                            actions.setFieldError("email", data);
                        },
                    });
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="login-form">
                        <InputField
                            type="email"
                            name="email"
                            labelName="Email"
                            touch={touched.email}
                            fieldRequired
                            error={errors.email}
                            placeHolder="example@example.com"
                        />
                        <FormButton
                            type="submit"
                            variant="primary"
                            name="Resend"
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

export default ResendVerification;
