import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/bundle.scss";
import "react-toastify/dist/ReactToastify.css";
import "@smastrom/react-rating/style.css";

import { LoginPrompt } from "@components/model/LoginPrompt";
import { MantineProvider } from "@mantine/core";
import type { DehydratedState } from "@tanstack/react-query";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
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
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
}
export default MyApp;
