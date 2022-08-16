import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import { useMemo } from "react";

const FullPageLoader = () => {
    const { data, isLoading, isError } = useUser();

    const isUserLoaded = useMemo(
        () => !data && !isError && isLoading,
        [data, isError, isLoading]
    );
    return (
        <div
            data-is-visible={JSON.stringify(isUserLoaded)}
            className="user-loading-overlay"
        >
            <div className="user-loading-overlay__content">
                <Image
                    src="/logo/logo.svg"
                    width="150px"
                    height="150px"
                    alt="Product logo"
                    objectFit="cover"
                    className="mb-4 loading-image"
                />
            </div>
        </div>
    );
};
export default FullPageLoader;
