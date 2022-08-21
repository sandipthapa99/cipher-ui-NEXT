import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/bundle.scss";
import "react-toastify/dist/ReactToastify.css";
import "@smastrom/react-rating/style.css";

import { LoginPrompt } from "@components/model/LoginPrompt";
import { MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { DehydratedState } from "@tanstack/react-query";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface CustomAppProps<P = any> extends Omit<AppProps<P>, "pageProps"> {
    pageProps: {
        dehydratedState: DehydratedState;
    };
    session: any;
}

const UserLoadingOverlay = dynamic(
    () => import("@components/common/FullPageLoader"),
    { ssr: false }
);
function MyApp({ Component, pageProps, session }: CustomAppProps) {
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
    return (
        <GoogleOAuthProvider
            clientId={
                "245846975950-vucoc2e1cmeielq5f5neoca7880n0u2i.apps.googleusercontent.com"
            }
        >
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={session}>
                    <ReactQueryDevtools />
                    <ToastContainer
                        position="top-center"
                        hideProgressBar={true}
                        autoClose={1000}
                    />
                    <Hydrate state={pageProps.dehydratedState}>
                        <MantineProvider>
                            <UserLoadingOverlay />
                            <LoginPrompt />
                            <Component {...pageProps} />
                        </MantineProvider>
                    </Hydrate>
                </SessionProvider>
            </QueryClientProvider>
        </GoogleOAuthProvider>
    );
}
export default MyApp;
