import SocialLoginBtn from "@components/common/SocialLoginBtn";
import ReactGoogleLogin from "react-google-login";

const getGoogleClientId = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) throw new Error("Google Client ID is not set");
    return clientId;
};
const GoogleLogin = () => {
    return (
        <ReactGoogleLogin
            scope="profile email"
            isSignedIn={true}
            autoLoad={false}
            clientId={getGoogleClientId()}
            onFailure={(err) => console.log(err)}
            onSuccess={(response) => console.log(response)}
            render={(renderProps) => (
                <SocialLoginBtn
                    className="google"
                    onClick={renderProps.onClick}
                    name="Sign in with Google"
                    icon="/illustrations/google.svg"
                />
            )}
        />
    );
};

export default GoogleLogin;
