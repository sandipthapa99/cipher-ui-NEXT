import { FacebookLogin } from "@components/auth/FacebookLogin";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PasswordField from "@components/common/PasswordField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { ActionIcon, Tooltip } from "@mantine/core";
import { EmailOutlined, PhoneIphoneOutlined } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useLogin } from "hooks/auth/useLogin";
import localforage from "localforage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// import useUserStore from "store/use-user-store";
import { getLoginSchema } from "utils/formValidation/loginFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

const Login = () => {
    const queryClient = useQueryClient();

    const router = useRouter();

    const { mutate: loginMutation, isLoading } = useLogin();

    const [fcmToken, setFcmToken] = useState("");

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
                    validationSchema={() => getLoginSchema()}
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={(values, actions) => {
                        const newValues = {
                            ...values,
                            fcm_token: fcmToken ? fcmToken : null,
                        };

                        loginMutation(newValues, {
                            onError: (error: any) => {
                                const {
                                    data: { username, password },
                                } = error.response;

                                actions.setFieldError(
                                    "username",
                                    username && username[0]
                                );
                                actions.setFieldError("password", password);
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
                            <div className="d-flex align-items-top gap-3">
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
                                        mt={28}
                                        size={48}
                                        style={{ width: 112 }}
                                    >
                                        {is_email ? (
                                            <PhoneIphoneOutlined
                                                className="text-black"
                                                style={{ fontSize: 18 }}
                                            />
                                        ) : (
                                            <EmailOutlined
                                                className="text-black"
                                                style={{ fontSize: 18 }}
                                            />
                                        )}
                                        <span
                                            style={{
                                                color: "#343A40",
                                                marginLeft: "0.8rem",
                                                fontSize: "1.4rem",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {is_email ? "Phone" : "Email"}
                                        </span>
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
                            <Link href={"/resend-verification"}>
                                <a className="d-flex justify-content-end mb-3 small">
                                    Didn&apos;t get verification email?
                                </a>
                            </Link>
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
