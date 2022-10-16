import { FacebookLogin } from "@components/auth/FacebookLogin";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import localforage from "localforage";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getLoginSchema } from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Login = () => {
    const queryClient = useQueryClient();

    const router = useRouter();

    const { mutate: loginMutation, isLoading } = useLogin();
    const { data: user } = useUser();

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [fcmToken, setFcmToken] = useState("");

    const { next } = router.query;

    const getFCMTOKEN = async () => {
        if (typeof window !== "undefined") {
            const token = await localforage.getItem<string>("fcm_token");
            return token;
        }
        return null;
    };
    const token = getFCMTOKEN();
    token.then((token) => {
        if (token) {
            setFcmToken(token);
        }
    });

    const handleChange = (
        event: ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const { value } = event.currentTarget;

        setFieldValue("username", value);

        if (!isNaN(parseInt(value, 10))) {
            setIsPhoneNumber(true);
            return;
        }
        setIsPhoneNumber(false);
    };

    const { data: profile } = useGetProfile();

    useEffect(() => {
        if (!loginSuccess) return;
        const loginRedirectURL = !profile
            ? "/settings/account/individual"
            : next
            ? next
            : "/home";
        router.push(loginRedirectURL.toString());
        toast.success("Successfully logged in");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginSuccess, next, profile]);
    return (
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
                    validationSchema={() => getLoginSchema(isPhoneNumber)}
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        const newValues = {
                            ...values,
                            fcm_token: fcmToken ? fcmToken : null,
                        };

                        loginMutation(newValues, {
                            onError: (error) => {
                                toast.error(error.message);
                            },
                            onSuccess: async () => {
                                await queryClient.invalidateQueries(["user"]);
                                await queryClient.invalidateQueries([
                                    "profile",
                                    user?.id,
                                ]);
                                setLoginSuccess(true);
                            },
                        });
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form className="login-form">
                            <InputField
                                name="username"
                                labelName="Username"
                                touch={touched.username}
                                error={errors.username}
                                placeHolder="Enter your username"
                                onChange={(event) =>
                                    handleChange(event, setFieldValue)
                                }
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
                                isSubmittingClass={isSubmittingClass(isLoading)}
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

                            <div className="button-wrapper-social d-flex justify-content-evenly">
                                <Google />
                                <FacebookLogin />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </OnBoardingLayout>
    );
};

export default Login;
