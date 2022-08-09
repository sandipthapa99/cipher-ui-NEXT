import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/bundle.scss";
import "react-toastify/dist/ReactToastify.css";

import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BookNowProvider from "context/BookNowContext/bookNowProvider";
import { ClientTaskContextProvider } from "context/ClientTaskContext";
import SearchProvider from "context/searchProvider";
import SuccessProvider from "context/successContext/successProvider";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import AuthProvider from "../context/AuthContext/userContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <SearchProvider>
            <SuccessProvider>
                <AuthProvider>
                    <ClientTaskContextProvider>
                        <BookNowProvider>
                            <QueryClientProvider client={queryClient}>
                                <ReactQueryDevtools />
                                <ToastContainer position="top-center" />
                                <Hydrate state={pageProps.dehydratedState}>
                                    <Component {...pageProps} />
                                </Hydrate>
                            </QueryClientProvider>
                        </BookNowProvider>
                    </ClientTaskContextProvider>
                </AuthProvider>
            </SuccessProvider>
        </SearchProvider>
    );
}

export default MyApp;
