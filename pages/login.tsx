import { FacebookLogin } from "@components/auth/FacebookLogin";
// import GoogleLogin from "@components/auth/GoogleLogin";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import SocialLoginBtn from "@components/common/SocialLoginBtn";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { Form, Formik } from "formik";
import type { LoginPayload } from "hooks/auth/useLogin";
import { useLogin } from "hooks/auth/useLogin";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import {
    loginWithPhoneSchema,
    loginWithUsernameSchema,
} from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Login = () => {
    const router = useRouter();
    const { mutate, isLoading } = useLogin();
    const [loginMethod, setLoginMethod] = useState<"username" | "phone">(
        "username"
    );
    const toggleLoginMethod = (
        setFieldError: (field: string, message: any) => void
    ) => {
        // reset username and phone field errors on toggle
        setFieldError("username", "");
        setFieldError("phone", "");
        setLoginMethod((currentMethod) =>
            currentMethod === "username" ? "phone" : "username"
        );
    };
    const switchLoginBtnText =
        loginMethod === "username"
            ? "Login with phone number ?"
            : "Login with username ?";

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
                        initialValues={{
                            username: "",
                            password: "",
                            phone: "",
                        }}
                        validationSchema={
                            loginMethod === "username"
                                ? loginWithUsernameSchema
                                : loginWithPhoneSchema
                        }
                        onSubmit={(values) => {
                            const { username, phone, password } = values;
                            const getLoginPayload = (): LoginPayload => {
                                if (loginMethod === "username")
                                    return {
                                        type: "username",
                                        username,
                                        password,
                                    };
                                return { type: "phone", phone, password };
                            };
                            const loginPayload = getLoginPayload();
                            mutate(loginPayload, {
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
                        {({ errors, touched, setFieldError }) => (
                            <Form className="login-form">
                                <button
                                    onClick={() =>
                                        toggleLoginMethod(setFieldError)
                                    }
                                    className="switch-login-method"
                                    type="button"
                                >
                                    {switchLoginBtnText}
                                </button>
                                {loginMethod === "username" ? (
                                    <InputField
                                        name="username"
                                        labelName="Username"
                                        touch={touched.username}
                                        error={errors.username}
                                        placeHolder="Enter your username"
                                    />
                                ) : (
                                    <InputField
                                        name="phone"
                                        labelName="Phone number"
                                        touch={touched.phone}
                                        error={errors.phone}
                                        placeHolder="Enter your phone number"
                                    />
                                )}
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
                                
                                {/* <SocialLoginBtn
                                    name={"Continue with Google"}
                                    icon="/illustrations/google.svg"
                                    className="google"
                                    redirectionLink={`${process.env.NEXT_PUBLIC_API_URL}/social-auth/login/google-oauth2/`}
                                /> */}
                                <FacebookLogin />

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
