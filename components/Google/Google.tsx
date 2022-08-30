import { GoogleLogin } from "@react-oauth/google";
import { useQuery } from "@tanstack/react-query";
import { log } from "console";
import { useGoogle } from "hooks/auth/use-Google";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";

const Google = () => {
    const { mutate, data } = useGoogle();
    const router = useRouter();

    return (
        <GoogleLogin
            size="large"
            auto_select={false}
            onSuccess={(credentialResponse) => {
                mutate(credentialResponse, {
                    onSuccess: (data) => {
                        autoLogin(data.access, data.refresh);
                        toast.success("Successfully logged in");
                        router.push("/");
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
