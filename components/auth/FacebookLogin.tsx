import SocialLoginBtn from "@components/common/SocialLoginBtn";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "@mantine/hooks";
import { useFacebook } from "hooks/auth/use-facebook";
import localforage from "localforage";
import { useRouter } from "next/router";
import { useState } from "react";
import ReactFacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { autoLogin } from "utils/auth";
import { toast } from "utils/toast";

const getFacebookAppId = () => {
    const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    if (!appId) throw new Error("Facebook App ID is not set");
    return appId;
};
export const FacebookLogin = () => {
    const { mutate } = useFacebook();
    // Set initial value in second argument and getInitialValueInEffect option to false
    const nestHubScreen = useMediaQuery("(width: 1024px)", true);
    const nestHubMaxScreen = useMediaQuery("(width: 1280px)", true);
    const router = useRouter();
    const [FCM_TOKEN, setFCM_TOKEN] = useState("");
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
            setFCM_TOKEN(token);
        }
    });

    return (
        <ReactFacebookLogin
            callback={(response) => {
                const newData = { ...response, FCM_TOKEN };
                mutate(newData, {
                    onSuccess: (data) => {
                        autoLogin(data.access, data.refresh);
                        toast.success("Successfully logged in");
                        router.push("/home");
                    },
                    onError: (err) => {
                        toast.error(err.message);
                    },
                });
            }}
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
        />
    );
};
