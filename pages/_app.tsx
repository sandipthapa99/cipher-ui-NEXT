import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/bundle.scss";
import "react-toastify/dist/ReactToastify.css";
import "@smastrom/react-rating/style.css";

import { LoginPrompt } from "@components/model/LoginPrompt";
import type { DehydratedState } from "@tanstack/react-query";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BookNowProvider from "context/BookNowContext/bookNowProvider";
import { ClientTaskContextProvider } from "context/ClientTaskContext";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface CustomAppProps<P = any> extends Omit<AppProps<P>, "pageProps"> {
    pageProps: {
        dehydratedState: DehydratedState;
    };
}

const UserLoadingOverlay = dynamic(
    () => import("@components/common/FullPageLoader"),
    { ssr: false }
);
function MyApp({ Component, pageProps }: CustomAppProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <ClientTaskContextProvider>
            <BookNowProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <ToastContainer position="top-center" />
                    <Hydrate state={pageProps.dehydratedState}>
                        <UserLoadingOverlay />
                        <LoginPrompt />
                        <Component {...pageProps} />
                    </Hydrate>
                </QueryClientProvider>
            </BookNowProvider>
        </ClientTaskContextProvider>
    );
}
export default MyApp;
