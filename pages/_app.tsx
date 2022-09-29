import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/bundle.scss";
import "react-toastify/dist/ReactToastify.css";
import "@smastrom/react-rating/style.css";

// import "../public/firebase-messaging-sw";
import { RouterTransition } from "@components/common/RouterTransition";
import { LoginPrompt } from "@components/model/LoginPrompt";
import { MantineProvider } from "@mantine/core";
import { Alert, Button, Dialog, Group, Highlight, Text } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
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
import { ToastContainer } from "react-toastify";

import { firebaseCloudMessaging } from "../firebase/firebase";

// import { getFirebaseToken, onMessageListener } from "../utils/firebase";

interface CustomAppProps<P = any> extends Omit<AppProps<P>, "pageProps"> {
    pageProps: {
        dehydratedState: DehydratedState;
    };
}

function MyApp({ Component, pageProps }: CustomAppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
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
                    <ToastContainer
                        position="top-center"
                        hideProgressBar={true}
                        autoClose={1000}
                    />
                    <Hydrate state={pageProps.dehydratedState}>
                        <MantineProvider>
                            <ModalsProvider
                                labels={{
                                    confirm: "Submit",
                                    cancel: "Cancel",
                                }}
                            >
                                <RouterTransition />
                                {/* <UserLoadingOverlay /> */}
                                <LoginPrompt />
                                <Component {...pageProps} />
                            </ModalsProvider>
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
                    Allow notification for push notifications.
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
