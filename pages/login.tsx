import { FacebookLogin } from "@components/auth/FacebookLogin";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { faEnvelope, faMobile } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import Cookies from "js-cookie";
import localforage from "localforage";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useState } from "react";
// import useUserStore from "store/use-user-store";
import { axiosClient } from "utils/axiosClient";
import { getLoginSchema } from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

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

    const [is_email, setIs_email] = useState(true);

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
                            },
                            onSuccess: async (hasProfile) => {
                                const { next } = router.query;
                                await queryClient.invalidateQueries(["user"]);
                                const redirectUrl = !hasProfile
                                    ? "/settings/account/individual"
                                    : next
                                    ? next
                                    : "/home";
                                // await HandleUserFetchFlow();
                                router.push(redirectUrl.toString());
                                toast.success("Login successful");
                            },
                        });
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="login-form">
                            <div className="d-flex align-items-center gap-3">
                                {is_email ? (
                                    <InputField
                                        name="username"
                                        labelName="Username"
                                        className="w-100"
                                        touch={touched.username}
                                        error={errors.username}
                                        placeHolder="Enter your username"
                                    />
                                ) : (
                                    <PhoneNumberInput
                                        name={"username"}
                                        labelName="Phone Number"
                                        touch={touched.username}
                                        className="w-100"
                                        error={errors.username}
                                        placeHolder={"Enter your Phone Number"}
                                    />
                                )}

                                <Tooltip
                                    label={
                                        is_email
                                            ? `Login with phone`
                                            : `Login with e-mail`
                                    }
                                >
                                    <ActionIcon
                                        variant="filled"
                                        onClick={() => setIs_email(!is_email)}
                                        className="ms-auto border border-grey"
                                        color={"gray.1"}
                                        size={48}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                is_email ? faMobile : faEnvelope
                                            }
                                            className="text-black"
                                        />
                                    </ActionIcon>
                                </Tooltip>
                            </div>

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
                        </Form>
                    )}
                </Formik>
                <div className="button-wrapper-social d-flex justify-content-evenly">
                    <Google login={true} />
                    <FacebookLogin login={true} />
                </div>
            </div>
        </OnBoardingLayout>
    );
};

export default Login;
