import FormButton from "@components/common/FormButton";
import PasswordField from "@components/common/PasswordField";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Form, Formik } from "formik";
import { useForm } from "hooks/use-form";
import { useRouter } from "next/router";
import { useToggleSuccessModal } from "store/use-success-modal";
import { emailResetFormSchema } from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

const ResetPassword = () => {
    const router = useRouter();

    const { u, t } = router.query;
    const uid = u;
    const token = t;

    const toggleSuccessModal = useToggleSuccessModal();

    const { mutate } = useForm("/user/reset/email/verify/");
    return (
        <OnBoardingLayout
            topLeftText="Already have an account ?"
            topRightText="Login"
            welcomeText="Hey! No worries   👋"
            headerText="Reset your password?"
            mainImg="/illustrations/forgot-pass.svg"
            redirectionLink="/login"
            currentPage="forgot-password"
        >
            <Formik
                initialValues={{ password: "", confirm_password: "" }}
                validationSchema={emailResetFormSchema}
                onSubmit={async (values, actions) => {
                    mutate(
                        { uid, token, ...values },
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
                            onError: (error) => {
                                toast.error(error.message);
                            },
                        }
                    );
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="login-form">
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
                            name="confirm_password"
                            labelName="Confirm Password"
                            touch={touched.confirm_password}
                            error={errors.confirm_password}
                            placeHolder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
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

export default ResetPassword;
