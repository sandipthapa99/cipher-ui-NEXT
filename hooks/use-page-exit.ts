import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

/**
 *
 * @param onExit - Callback to be called when the page is exited
 */
export const usePageExit = (onExit: () => void) => {
    const router = useRouter();
    const handleRouteChangeStart = useCallback(async () => {
        new Promise((resolve, reject) => setTimeout(resolve, 3000)).then(() => {
            onExit();
        });
    }, [onExit]);
    useEffect(() => {
        router.events.on("routeChangeStart", handleRouteChangeStart);
        return () =>
            router.events.off("routeChangeStart", handleRouteChangeStart);
    }, [handleRouteChangeStart, onExit, router.events]);
};
