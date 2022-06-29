import SocialLoginBtn from "@components/common/SocialLoginBtn";
import OnBoardingLayout from "@components/OnBoardingLayout";

const Signup = () => {
    return (
        <OnBoardingLayout
            topLeftText="Already have an account?"
            topRightText="Sign in"
            welcomeText="Welcome aboard!👋"
            headerText="Sign Up with us to get Started  !"
            mainImg="/illustrations/signup.svg"
            redirectionLink="/login"
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
                By signing up, you agree our <span><a href="">Terms and Conditions</a></span>.
            </p>


        </OnBoardingLayout>
    )
}
export default Signup;