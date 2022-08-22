import { GoogleLogin } from "@react-oauth/google";

const Google = () => {
    return (
        <GoogleLogin
            type="standard"
            width="600px"
            auto_select={true}
            cancel_on_tap_outside={true}
            logo_alignment="center"
            useOneTap={false}
            context="signin"
            onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
};
export default Google;
