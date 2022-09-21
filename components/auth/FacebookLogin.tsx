import SocialLoginBtn from "@components/common/SocialLoginBtn";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "@mantine/hooks";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const getFacebookAppId = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    if (!appId) throw new Error("Facebook App ID is not set");
    return appId;
};
export const FacebookLogin = () => {
    // Set initial value in second argument and getInitialValueInEffect option to false
    const nestHubScreen = useMediaQuery("(width: 1024px)", true);
    const nestHubMaxScreen = useMediaQuery("(width: 1280px)", true);

    return (
        <ReactFacebookLogin
            autoLoad={false}
            appId={getFacebookAppId()}
            render={(renderProps) => (
                //<SocialLoginBtn
                //    onClick={renderProps.onClick}
                //    name="Sign in with Facebook"
                //    className="facebook"
                //    icon="faFacebook"
                ///>

                <div
                    onClick={renderProps.onClick}
                    className="custom-facebook gap-2"
                >
                    <FontAwesomeIcon color="blue" size="2x" icon={faFacebook} />
                    <span>
                        {nestHubScreen
                            ? "Facebook"
                            : nestHubMaxScreen
                            ? "Facebook"
                            : "Sign in with Facebook"}
                    </span>
                </div>
            )}
            callback={(response) => console.log(response)}
        />
    );
};
