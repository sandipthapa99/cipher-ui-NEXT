import { FacebookLogin } from "@components/auth/FacebookLogin";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { async } from "@firebase/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import { useUser } from "hooks/auth/useUser";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import localforage from "localforage";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { UserService } from "services/userService";
import useUserStore from "store/use-user-store";
import { axiosClient } from "utils/axiosClient";
import { getLoginSchema } from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";
import { useStore } from "zustand";

interface ResendEmailVerification {
    email: string;
}

const Login = () => {
    const queryClient = useQueryClient();

    const router = useRouter();

    const { mutate: loginMutation, isLoading } = useLogin();

    const [isPhoneNumber, setIsPhoneNumber] = useState(false);
    const [fcmToken, setFcmToken] = useState("");
    const resendEmail = Cookies.get("email");

    const resendEmailVerificationMutation = useMutation(
        (data: ResendEmailVerification) => {
            return axiosClient.post(`/user/resend/email/activation/`, data);
        }
    );
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

    // useStoreUser(userData ? userData : {});

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
    const userSet = useUserStore((state) => state.setUser);

    const HandleUserFetchFlow = async () => {
        const access = Cookies.get("access");
        if (access === undefined) return null;

        const user = await UserService.fetchUser(access);
        try {
            const res = await axiosClient.get(`/user/${user?.id}`);
            localStorage.setItem("user", JSON.stringify(res));
            userSet(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <OnBoardingLayout
            topLeftText="Don't have an account ?"
            topRightText="Create an account"
            welcomeText="Welcome Back!   👋"
            headerText="Login to your account"
            mainImg="/illustrations/login.svg"
            redirectionLink="/signup"
            currentPage="login"
            title="Homaale | Login"
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

                                // actions.setFieldError(
                                //     "username",
                                //     error.message
                                // );

                                // actions.setFieldError(
                                //     "password",
                                //     error.message
                                // );
                            },
                            onSuccess: async (hasProfile) => {
                                const { next } = router.query;
                                await queryClient.invalidateQueries(["user"]);
                                const redirectUrl = !hasProfile
                                    ? "/settings/account/individual"
                                    : next
                                    ? next
                                    : "/home";
                                await HandleUserFetchFlow();
                                router.push(redirectUrl.toString());
                                toast.success("Login successful");
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
                            <div className=" d-flex align-items-end justify-content-end">
                                <p
                                    style={{
                                        cursor: "pointer",
                                        color: "#3eaeff",
                                        fontSize: "14px",
                                        margin: "0 0 10px 0",
                                    }}
                                    onClick={() => {
                                        if (resendEmail) {
                                            resendEmailVerificationMutation.mutate(
                                                {
                                                    email: resendEmail,
                                                },
                                                {
                                                    onSuccess: () => {
                                                        toast.success(
                                                            "verification email sent succesfully"
                                                        );
                                                    },
                                                    onError: (err: any) => {
                                                        toast.error(
                                                            err.message
                                                        );
                                                    },
                                                }
                                            );
                                        }
                                    }}
                                >
                                    Didn&apos;t get verification email?
                                </p>
                            </div>
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
                                <Google login={true} />
                                <FacebookLogin login={true} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </OnBoardingLayout>
    );
};

export default Login;
