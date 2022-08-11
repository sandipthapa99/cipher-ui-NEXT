import { useUser } from "hooks/auth/useUser";
import { useMemo } from "react";
import { Spinner } from "react-bootstrap";

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
                <Spinner animation="border" />
            </div>
        </div>
    );
};
export default FullPageLoader;
