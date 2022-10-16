import { GoogleLogin } from "@react-oauth/google";
import { useQuery } from "@tanstack/react-query";
import { log } from "console";
import { useGoogle } from "hooks/auth/use-Google";
import Cookies from "js-cookie";
import localforage from "localforage";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";

const Google = () => {
    const { mutate, data } = useGoogle();
    const [FCM_TOKEN, setFCM_TOKEN] = useState("");
    const router = useRouter();
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
    // interface GoogleResponse {
    //     clientId: string;
    //     credential: string;
    //     select_by: string;
    // }

    return (
        <GoogleLogin
            size="large"
            auto_select={false}
            theme="outline"
            // width="1200px"
            onSuccess={(credentialResponse) => {
                const newData = { ...credentialResponse, FCM_TOKEN };

                mutate(newData, {
                    onSuccess: (data) => {
                        autoLogin(
                            data.access,
                            data.refresh,
                            credentialResponse.credential
                        );
                        toast.success("Successfully logged in");
                        router.push("/home");
                    },
                    onError: (err) => {
                        toast.error(err.message);
                    },
                });
                //
            }}
            onError={() => {
                toast.error("Error logging in");
            }}
        />
    );
};
export default Google;
