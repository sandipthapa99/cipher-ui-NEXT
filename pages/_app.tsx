import "../styles/bundle.scss";

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
                        <Component {...pageProps} />
                    </AuthProvider>
                </SuccessProvider>
            </SearchProvider>
        </UserProvider>
    );
}

export default MyApp;
