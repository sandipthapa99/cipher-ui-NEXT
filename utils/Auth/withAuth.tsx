import { useAuthContext } from "context/AuthContext/userContext";
import { useRouter } from "next/router";
import type { ComponentType } from "react";
import { useEffect } from "react";

const RESTRICTED_ROUTES_ON_LOGGED_IN = ["/login", "/signup"];

export const withAuth = <T,>(Component: ComponentType<T>) => {
    const WrapperApp = (props: T) => {
        const { token } = useAuthContext();
        const router = useRouter();
        console.log(router.pathname);

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
