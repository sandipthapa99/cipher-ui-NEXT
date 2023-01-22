import "../styles/bundle.scss";
import "@smastrom/react-rating/style.css";

import { RouterTransition } from "@components/common/RouterTransition";
import { LoginPrompt } from "@components/model/LoginPrompt";
import { MantineProvider } from "@mantine/core";
import { Dialog, Text } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { DehydratedState } from "@tanstack/react-query";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import localforage from "localforage";
import * as memoryDriver from "localforage-driver-memory";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SSRProvider } from "react-bootstrap";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { firebaseCloudMessaging } from "../firebase/firebase";

localforage.defineDriver(memoryDriver);
localforage.setDriver(memoryDriver._driver);

interface CustomAppProps<P = any> extends Omit<AppProps<P>, "pageProps"> {
    pageProps: {
        dehydratedState: DehydratedState;
    };
}
const getReptcha = () => {
    const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (RECAPTCHA_SITE_KEY === undefined)
        throw new Error(
            "Please specify an RECAPTCHA_SITE_KEY in the environment variable RECAPTCHA_SITE_KEY"
        );
    return RECAPTCHA_SITE_KEY;
};

function MyApp({ Component, pageProps }: CustomAppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: false,
                    },
                },
            })
    );
    const [mounted, setMounted] = useState(false);
    const [opened, setOpened] = useState(false);
    const [token, setToken] = useState("");

    if (mounted) {
        firebaseCloudMessaging.onMessage();
    }

    const getFire = () =>
        firebaseCloudMessaging
            .tokenInlocalforage()
            .then((data) => {
                setToken(data ?? "");
            })
            .catch((err) => {
                console.log(err);
            });

    useEffect(() => {
        firebaseCloudMessaging.init();
        const setToken = async () => {
            const token = await firebaseCloudMessaging.tokenInlocalforage();
            if (token) {
                setMounted(true);
            }
        };
        setToken();
        getFire();
    }, [token]);

    useEffect(() => {
        if (!token && typeof window !== "undefined" && mounted) {
            navigator.serviceWorker.getRegistrations().then((r) => {
                return Promise.all(r.map((reg) => reg.unregister()));
            });
        }
    }, [token, mounted]);

    return (
        <>
            <SSRProvider>
                <GoogleOAuthProvider
                    clientId={
                        "245846975950-vucoc2e1cmeielq5f5neoca7880n0u2i.apps.googleusercontent.com"
                    }
                >
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtools />
                        <Hydrate state={pageProps.dehydratedState}>
                            <MantineProvider>
                                <NotificationsProvider
                                    limit={1}
                                    position="top-center"
                                    autoClose={3000}
                                >
                                    <ModalsProvider
                                        labels={{
                                            confirm: "Submit",
                                            cancel: "Cancel",
                                        }}
                                    >
                                        <RouterTransition />
                                        {/* <UserLoadingOverlay /> */}
                                        <LoginPrompt />
                                        <GoogleReCaptchaProvider
                                            reCaptchaKey={getReptcha()}
                                        >
                                            <Component {...pageProps} />
                                        </GoogleReCaptchaProvider>
                                    </ModalsProvider>
                                </NotificationsProvider>
                            </MantineProvider>
                        </Hydrate>
                    </QueryClientProvider>
                </GoogleOAuthProvider>
                <Dialog
                    opened={opened}
                    onClose={() => setOpened(false)}
                    size="lg"
                    radius="md"
                    className="d-flex gap-3 notification-dialog"
                >
                    <Text
                        size="sm"
                        className="m-0"
                        style={{ marginBottom: 10 }}
                        weight={400}
                    >
                        Allow notification for Web notifications.
                    </Text>
                    <Text
                        color="green"
                        size="sm"
                        className="m-0"
                        style={{ marginBottom: 10, cursor: "pointer" }}
                        weight={500}
                        onClick={() => {
                            Notification.requestPermission();
                            setOpened(false);
                            console.log("asdssad");
                        }}
                    >
                        Ok.
                    </Text>
                    <Text
                        color="red"
                        size="sm"
                        className="m-0"
                        style={{ marginBottom: 10, cursor: "pointer" }}
                        weight={500}
                        onClick={() => {
                            console.log("clodsed");

                            setOpened(false);
                        }}
                    >
                        No Thanks
                    </Text>
                </Dialog>
            </SSRProvider>
        </>
    );
}

export default MyApp;
