import { GoogleLogin } from "@react-oauth/google";
import { useGoogle } from "hooks/auth/use-Google";
import { toast } from "react-toastify";

const Google = () => {
    const { mutate } = useGoogle();
    return (
        <GoogleLogin
            auto_select={false}
            logo_alignment="center"
            onSuccess={(credentialResponse) => {
                mutate(credentialResponse, {
                    onSuccess: () => {
                        toast.success("Successfully logged in");
                    },
                    onError: (err) => {
                        toast.error(err.message);
                    },
                });
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log("Login Failed");
            }}
        />
    );
};
export default Google;
