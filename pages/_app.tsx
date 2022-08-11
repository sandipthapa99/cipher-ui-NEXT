import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/bundle.scss";
import "react-toastify/dist/ReactToastify.css";

import { PrivateRoute } from "@components/common/PrivateRoute";
import type { DehydratedState } from "@tanstack/react-query";
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
import dynamic from "next/dynamic";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import AuthProvider from "../context/AuthContext/userContextProvider";
interface CustomAppProps<P = any> extends Omit<AppProps<P>, "pageProps"> {
    pageProps: {
        dehydratedState: DehydratedState;
    };
}
const PROTECTED_ROUTES = ["/profile"];
const RESTRICTED_ROUTES_ON_LOGGED_IN = ["/login"];

const UserLoadingOverlay = dynamic(
    () => import("@components/common/FullPageLoader"),
    { ssr: false }
);
function MyApp({ Component, pageProps }: CustomAppProps) {
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
                                    <UserLoadingOverlay />
                                    <PrivateRoute
                                        protectedRoutes={PROTECTED_ROUTES}
                                        restrictedRoutesOnLoggedIn={
                                            RESTRICTED_ROUTES_ON_LOGGED_IN
                                        }
                                    >
                                        <Component {...pageProps} />
                                    </PrivateRoute>
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
