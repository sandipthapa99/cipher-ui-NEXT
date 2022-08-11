import UserLoadingOverlay from "@components/common/FullPageLoader";
import { useUser } from "hooks/auth/useUser";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useEffect } from "react";

interface PrivateRouteProps {
    protectedRoutes: string[];
    restrictedRoutesOnLoggedIn?: string[];
    children: ReactNode;
}
export const PrivateRoute = ({
    protectedRoutes,
    restrictedRoutesOnLoggedIn,
    children,
}: PrivateRouteProps) => {
    const { data, isLoading, isError } = useUser();
    const router = useRouter();
    const currentPath = router.pathname;
    const isPathProtected = protectedRoutes.indexOf(currentPath) !== -1;
    const isRestrictednOnLoggedIn = restrictedRoutesOnLoggedIn
        ? restrictedRoutesOnLoggedIn.indexOf(currentPath) !== -1
        : false;

    useEffect(() => {
        if (!isLoading && data && isRestrictednOnLoggedIn) {
            router.push("/");
        }
        if (!isLoading && !data && !isError && isPathProtected) {
            router.push(`/login?next=${currentPath}`);
        }
    }, [
        currentPath,
        data,
        isError,
        isLoading,
        isPathProtected,
        isRestrictednOnLoggedIn,
        router,
    ]);
    if ((isLoading || !data) && isPathProtected) return <UserLoadingOverlay />;
    return <>{children}</>;
};
