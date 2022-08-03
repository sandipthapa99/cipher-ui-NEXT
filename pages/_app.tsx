import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/bundle.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BookNowProvider from "context/BookNowContext/bookNowProvider";
import { ClientTaskContextProvider } from "context/ClientTaskContext";
import SearchProvider from "context/searchProvider";
import SuccessProvider from "context/successContext/successProvider";
import type { AppProps } from "next/app";

import AuthProvider from "../context/AuthContext/userContextProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SearchProvider>
            <SuccessProvider>
                <AuthProvider>
                    <ClientTaskContextProvider>
                        <BookNowProvider>
                            <QueryClientProvider client={queryClient}>
                                <ReactQueryDevtools />
                                <Component {...pageProps} />
                            </QueryClientProvider>
                        </BookNowProvider>
                    </ClientTaskContextProvider>
                </AuthProvider>
            </SuccessProvider>
        </SearchProvider>
    );
}

export default MyApp;
