import GoogleLogin from "@components/auth/GoogleLogin";
import SocialLoginBtn from "@components/common/SocialLoginBtn";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import Link from "next/link";

const Signup = () => {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => console.log(codeResponse),
        flow: "implicit",
    });
    return (
        <OnBoardingLayout
            topLeftText="Already have an account?"
            topRightText="Sign in"
            welcomeText="Welcome aboard!👋"
            headerText="Sign Up with us to get Started  !"
            mainImg="/illustrations/signup.svg"
            redirectionLink="/login"
            currentPage="signup"
        >
            <SocialLoginBtn
                name={"Continue with Facebook"}
                icon="/illustrations/fb.svg"
                className="facebook"
                redirectionLink={`${process.env.NEXT_PUBLIC_API_URL}/social-auth/login/facebook/`}
            />
            <Google />

            <SocialLoginBtn
                name={"Continue with Google"}
                icon="/illustrations/google.svg"
                className="google"
                onClick={() => login()}
            />
            <SocialLoginBtn
                name={"Sign Up with Email"}
                icon="/illustrations/forEmail.svg"
                redirectionLink="/signup/choose"
                className="email"
            />
            <p className="terms-condition-agree-text">
                By signing up, you agree our{" "}
                <span>
                    <Link href="/terms-conditions">
                        <a>Terms and Conditions</a>
                    </Link>
                </span>
                .
            </p>
        </OnBoardingLayout>
    );
};
export default Signup;
