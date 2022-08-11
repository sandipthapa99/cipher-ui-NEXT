import UserLoadingOverlay from "@components/common/FullPageLoader";
import { useUser } from "hooks/auth/useUser";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface PrivateRouteProps {
    protectedRoutes: string[];
    restrictedRoutesOnLoggedIn: string[];
    children: ReactNode;
}
export const PrivateRoute = ({
    protectedRoutes,
    restrictedRoutesOnLoggedIn,
    children,
}: PrivateRouteProps) => {
    const { data: user, isLoading, isError } = useUser();
    const router = useRouter();
    const currentPath = router.pathname;

    const isPathProtected = protectedRoutes.indexOf(currentPath) !== -1;

    const isRestrictedOnLoggedIn =
        restrictedRoutesOnLoggedIn.indexOf(currentPath) !== -1;

    useEffect(() => {
        if (!isLoading && user && isRestrictedOnLoggedIn) {
            router.push("/");
        }
    }, [isLoading, isRestrictedOnLoggedIn, router, user]);

    useEffect(() => {
        if (!isLoading && !user && !isError && isPathProtected) {
            router.push(`/login?next=${currentPath}`);
        }
    }, [currentPath, isError, isLoading, isPathProtected, router, user]);

    if ((isLoading || !user) && isPathProtected) return <UserLoadingOverlay />;
    return <>{children}</>;
};
