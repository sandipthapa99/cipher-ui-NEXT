import { FacebookLogin } from "@components/auth/FacebookLogin";
// import GoogleLogin from "@components/auth/GoogleLogin";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import SocialLoginBtn from "@components/common/SocialLoginBtn";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { loginFormData } from "utils/formData";
import loginFormSchema from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Login = () => {
    const router = useRouter();
    const { mutate, isLoading } = useLogin();

    return (
        <section>
            <OnBoardingLayout
                topLeftText="Don't have an account ?"
                topRightText="Create an account"
                welcomeText="Welcome Back!   👋"
                headerText="Login to your account"
                mainImg="/illustrations/login.svg"
                redirectionLink="/signup"
                currentPage="login"
            >
                <div>
                    <Formik
                        initialValues={loginFormData}
                        validationSchema={loginFormSchema}
                        onSubmit={(values) => {
                            mutate(values, {
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                                onSuccess: async () => {
                                    const { next } = router.query;
                                    await router.push(
                                        typeof next === "string" ? next : "/"
                                    );
                                    toast.success("Login Successful!");
                                },
                            });
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className="login-form">
                                <InputField
                                    type="email"
                                    name="username"
                                    labelName="Email or phone number"
                                    touch={touched.username}
                                    error={errors.username}
                                    placeHolder="Enter your email"
                                />
                                <PasswordField
                                    type="password"
                                    name="password"
                                    labelName="Password"
                                    touch={touched.password}
                                    error={errors.password}
                                    placeHolder="Password"
                                    forgotPassword="Forgot Password?"
                                />
                                <FormButton
                                    type="submit"
                                    variant="primary"
                                    name={isLoading ? "Loading" : "Login"}
                                    className="login-btn"
                                    isSubmitting={isLoading}
                                    isSubmittingClass={isSubmittingClass(
                                        isLoading
                                    )}
                                />
                                <div className="horizontal-line">
                                    <span className="or">OR</span>
                                </div>
                                {/* <SocialLoginBtn
                                    name={"Continue with Facebook"}
                                    icon="/illustrations/fb.svg"
                                    className="facebook"
                                    redirectionLink={`${process.env.NEXT_PUBLIC_API_URL}/social-auth/login/facebook/`}
                                />
                                {/* <Google /> */}
                                {/* <SocialLoginBtn
                                    name={"Continue with Google"}
                                    icon="/illustrations/google.svg"
                                    className="google"
                                    redirectionLink={`${process.env.NEXT_PUBLIC_API_URL}/social-auth/login/google-oauth2/`}
                                /> */}
                                <FacebookLogin />
                                {/* <GoogleLogin /> */}
                                <Google />
                            </Form>
                        )}
                    </Formik>
                </div>
            </OnBoardingLayout>
        </section>
    );
};

export default Login;
