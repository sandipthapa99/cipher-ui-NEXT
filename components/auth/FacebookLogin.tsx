import SocialLoginBtn from "@components/common/SocialLoginBtn";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const getFacebookAppId = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    if (!appId) throw new Error("Facebook App ID is not set");
    return appId;
};
export const FacebookLogin = () => {
    return (
        <ReactFacebookLogin
            appId={getFacebookAppId()}
            render={(renderProps) => (
                <SocialLoginBtn
                    onClick={renderProps.onClick}
                    name="Sign in with Facebook"
                    className="facebook"
                    icon="/illustrations/fb.svg"
                />
            )}
            callback={(response) => console.log(response)}
        />
    );
};
