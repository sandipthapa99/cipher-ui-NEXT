// import { useAuthContext } from "context/AuthContext/userContext";
// import { useRouter } from "next/router";
import { useAuthContext } from "context/AuthContext/userContext";
import { useRouter } from "next/router";
import type { ComponentType } from "react";
import { useEffect } from "react";
import { Component } from "react";

// const RESTRICTED_ROUTES_ON_LOGGED_IN = ["/login", "/signup"];

// export const withAuth = <T,>(Component: ComponentType<T>) => {
//     const WrapperApp = (props: T) => {
//         const { token } = useAuthContext();
//         const router = useRouter();
//

//         useEffect(() => {
//             if (
//                 token &&
//                 RESTRICTED_ROUTES_ON_LOGGED_IN.includes(router.pathname)
//             ) {
//                 router.push("/");
//             }
//             if (!token) router.push("/login");
//         }, [token, router]);
//         return <Component {...props} />;
//     };
//     return WrapperApp;
// };

export const withAuth = <T,>(Component: ComponentType<T>) => {
    const RESTRICTED_ROUTES = [
        "/login",
        "/signup",
        "/signup/choose",
        "/signup/client",
        "/signup/tasker",
    ];
    const WrapperApp = (props: T) => {
        const router = useRouter();
        const { token } = useAuthContext();

        useEffect(() => {
            if (token && RESTRICTED_ROUTES.includes(router.pathname)) {
                router.push("/");
            } else if (!token && !RESTRICTED_ROUTES.includes(router.pathname)) {
                router.push("/login");
            }

            // if (!token) {
            // }
        }, [token]);
        return <Component {...props} />;
    };
    return WrapperApp;
};
