import "../styles/bundle.scss";
import "@smastrom/react-rating/style.css";

// import "../public/firebase-messaging-sw";
import { RouterTransition } from "@components/common/RouterTransition";
import { LoginPrompt } from "@components/model/LoginPrompt";
import { MantineProvider } from "@mantine/core";
import { Alert, Button, Dialog, Group, Highlight, Text } from "@mantine/core";
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
import { clear } from "console";
import { useUser } from "hooks/auth/useUser";
import Cookies from "js-cookie";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { firebaseCloudMessaging } from "../firebase/firebase";

// import { getFirebaseToken, onMessageListener } from "../utils/firebase";

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
    const cookies = Cookies.get("access");
    const cookiesProvided = cookies ? true : false;

    if (mounted) {
        firebaseCloudMessaging.onMessage();
    }

    useEffect(() => {
        firebaseCloudMessaging.init();
        const setToken = async () => {
            const token = await firebaseCloudMessaging.tokenInlocalforage();
            if (token) {
                setMounted(true);
                // not working
            }
        };
        const result = setToken();
    }, []);
    useEffect(() => {
        if (
            (Notification.permission === "default" ||
                Notification.permission === "denied") &&
            cookiesProvided
        ) {
            const timer = setTimeout(() => {
                setOpened(true);
            }, 500000);
            return () => clearTimeout(timer);
        }
    });

    return (
        <>
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
                className="d-flex gap-3"
            >
                <Text
                    size="sm"
                    className="m-0"
                    style={{ marginBottom: 10 }}
                    weight={500}
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
                    onClick={() => setOpened(false)}
                >
                    No Thanks
                </Text>
            </Dialog>
        </>
    );
}

export default MyApp;
