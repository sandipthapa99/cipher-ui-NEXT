import BigButton from "@components/common/Button";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "@react-oauth/google";
import { useQuery } from "@tanstack/react-query";
import { log } from "console";
import { useGoogle } from "hooks/auth/use-Google";
import Cookies from "js-cookie";
import localforage from "localforage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

interface AccountInfo {
    name: string;
    disconnect?: boolean;
}

const ConnectAccount = ({ name, disconnect }: AccountInfo) => {
    // const login = () => {};
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
    const disconnectAccount = () => {
        console.log("disconnect");
    };
    return (
        <div className="account-wrapper">
            <div className="social-connection  me-4">
                {/* <span className="d-flex flex-col align-items-center justify-content-center my-4"> */}
                <div className="d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                        icon={name === "Google" ? faGoogle : faFacebookF}
                        className="svg-icon facebook-icon"
                    />
                </div>

                <h4 className="text-center">{name}</h4>
                {/* </span> */}
                <p>You are not signed in through {name}.</p>
                <div className="d-flex button-wrapper align-items-stretch justify-content-center my-4">
                    {/* <GoogleLogin
                        size="large"
                        auto_select={false}
                        theme="outline"
                        // width="1200px"
                        onSuccess={(credentialResponse) => {
                            const newData = {
                                ...credentialResponse,
                                FCM_TOKEN,
                            };

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
                    /> */}

                    <BigButton
                        btnTitle={"Connect"}
                        backgroundColor={"#211d4f"}
                        textColor={"#fff"}
                        // handleClick={

                        // }
                    />
                </div>
            </div>
        </div>
    );
};

export default ConnectAccount;
