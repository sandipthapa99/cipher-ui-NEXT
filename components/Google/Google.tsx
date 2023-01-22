import { GoogleLogin } from "@react-oauth/google";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useGoogle } from "hooks/auth/use-Google";
import Cookies from "js-cookie";
import localforage from "localforage";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { autoLogin } from "utils/auth";
import { axiosClient } from "utils/axiosClient";
import { toast } from "utils/toast";

const Google = ({ login }: { login: boolean }) => {
    const { mutate } = useGoogle();
    const router = useRouter();
    const queryClient = new QueryClient();
    const getFCMTOKEN = async () => {
        const token = Cookies.get("fcm_token");
        return token;
    };

    return (
        <GoogleLogin
            size="large"
            auto_select={false}
            theme="outline"
            // width="1200px"
            onSuccess={async (credentialResponse) => {
                const FCM_TOKEN = await getFCMTOKEN();
                const newData = { ...credentialResponse, FCM_TOKEN };

                {
                    login
                        ? mutate(newData, {
                              onSuccess: (data) => {
                                  autoLogin(
                                      data.access,
                                      data.refresh,
                                      credentialResponse.credential
                                  );
                                  toast.success("Successfully logged in");
                                  router.push("/home");
                                  queryClient.invalidateQueries([
                                      "linked-accounts",
                                  ]);
                                  queryClient.invalidateQueries(["profile"]);
                                  //   HandleUserFetchFlow();
                              },
                              onError: (err) => {
                                  toast.error(err.message);
                              },
                          })
                        : mutate(credentialResponse, {
                              onSuccess: () => {
                                  toast.success("Google Account Connected");
                                  queryClient.invalidateQueries([
                                      "linked-accounts",
                                  ]);
                                  queryClient.invalidateQueries(["profile"]);
                              },
                              onError: (err) => {
                                  toast.error(err.message);
                              },
                          });
                }
                //
            }}
            onError={() => {
                toast.error("Error logging in");
            }}
        />
    );
};
export default Google;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const queryClient = new QueryClient();
        const { data: linkedAccounts } = await axiosClient.get(
            "/user/linked-accounts/list/"
        );
        queryClient.prefetchQuery(["linked-accounts"]);
        return {
            props: {
                linkedAccounts,
                dehydratedState: dehydrate(queryClient),
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                linkedAccounts: [],
            },
            revalidate: 10,
        };
    }
};
