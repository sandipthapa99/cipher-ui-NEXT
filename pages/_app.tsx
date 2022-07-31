import "../styles/bundle.scss";

import { ClientTaskContextProvider } from "context/ClientTaskContext";
import SearchProvider from "context/searchProvider";
import SuccessProvider from "context/successContext/successProvider";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import AuthProvider from "../context/AuthContext/userContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    console.log(typeof router.pathname);

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
