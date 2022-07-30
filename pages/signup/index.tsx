import SocialLoginBtn from "@components/common/SocialLoginBtn";
import OnBoardingLayout from "@components/OnBoardingLayout";
import Link from "next/link";
import { withAuth } from "utils/Auth/withAuth";

const Signup = () => {
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
            />
            <SocialLoginBtn
                name={"Continue with Google"}
                icon="/illustrations/google.svg"
                className="google"
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
export default withAuth(Signup);
