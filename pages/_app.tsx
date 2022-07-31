import "../styles/bundle.scss";

import { ClientTaskContextProvider } from "context/ClientTaskContext";
import SearchProvider from "context/searchProvider";
import SuccessProvider from "context/successContext/successProvider";
import UserProvider from "context/userContextProvider";
import type { AppProps } from "next/app";

import AuthProvider from "../context/AuthContext/userContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <SearchProvider>
                <SuccessProvider>
                    <AuthProvider>
                        <ClientTaskContextProvider>
                            <Component {...pageProps} />
                        </ClientTaskContextProvider>
                    </AuthProvider>
                </SuccessProvider>
            </SearchProvider>
        </UserProvider>
    );
}

export default MyApp;
