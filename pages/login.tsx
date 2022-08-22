import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import SocialLoginBtn from "@components/common/SocialLoginBtn";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import {
    GoogleLogin,
    googleLogout,
    useGoogleLogin,
    useGoogleOneTapLogin,
} from "@react-oauth/google";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { loginFormData } from "utils/formData";
import loginFormSchema from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Login = () => {
    // const login = useGoogleOneTapLogin({
    //     onSuccess: (credentialResponse) => {
    //         console.log(credentialResponse);
    //     },
    //     onError: () => {
    //         console.log("Login Failed");
    //     },
    // });

    const router = useRouter();
    const { mutate, isLoading } = useLogin();
    // const { data: session } = useSession();
    // console.log(session);
    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => console.log(codeResponse),
    //     flow: "auth-code",
    // });

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
                                    name="email"
                                    labelName="Email or phone number"
                                    touch={touched.email}
                                    error={errors.email}
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
                                <SocialLoginBtn
                                    name={"Sign in with Facebook"}
                                    icon="/illustrations/fb.svg"
                                    className="facebook"
                                ></SocialLoginBtn>

                                {/* <SocialLoginBtn
                                    name={"Sign in with Google"}
                                    icon="/illustrations/google.svg"
                                    className="google"
                                ></SocialLoginBtn> */}
                                <Google />

                                {/* <div>
                                    {Object.values(providers).map(
                                        (provider) => (
                                            <div key={provider.name}>
                                                <button
                                                    onClick={() => {
                                                        console.log(
                                                            provider.id
                                                        );
                                                    }}
                                                >
                                                    Sign in with {provider.name}
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div> */}
                            </Form>
                        )}
                    </Formik>
                </div>
            </OnBoardingLayout>
        </section>
    );
};

export default Login;
