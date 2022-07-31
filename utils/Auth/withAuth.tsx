import { useRouter } from "next/router";
import nookies from "nookies";
import type { ComponentType } from "react";
import { useEffect } from "react";

const RESTRICTED_ROUTES_ON_LOGGED_IN = ["/login", "/signup"];

export const withAuth = <T,>(Component: ComponentType<T>) => {
    const WrapperApp = (props: T) => {
        const router = useRouter();
        const { token } = nookies.get(undefined, "token");

        useEffect(() => {
            if (
                token &&
                RESTRICTED_ROUTES_ON_LOGGED_IN.includes(router.pathname)
            ) {
                router.push("/");
            }
            if (!token) router.push("/login");
        }, [token, router]);
        return <Component {...props} />;
    };
    return WrapperApp;
};
