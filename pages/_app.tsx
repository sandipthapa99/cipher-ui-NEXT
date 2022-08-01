import "../styles/bundle.scss";

import { QueryClient } from "@tanstack/react-query";
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
                        <Component {...pageProps} />
                    </ClientTaskContextProvider>
                </AuthProvider>
            </SuccessProvider>
        </SearchProvider>
    );
}

export default MyApp;
