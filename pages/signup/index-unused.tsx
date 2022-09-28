import SocialLoginBtn from "@components/common/SocialLoginBtn";
import Google from "@components/Google/Google";
import OnBoardingLayout from "@components/OnBoardingLayout";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";

const Signup = () => {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => codeResponse,
        flow: "auth-code",
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
            <div style={{ marginBottom: "2.4rem" }}>
                <Google />
            </div>

            <SocialLoginBtn
                name={"Sign Up with Email or Phone Number"}
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
