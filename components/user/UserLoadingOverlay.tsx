import { useUser } from "hooks/auth/useUser";
import { Spinner } from "react-bootstrap";

const UserLoadingOverlay = () => {
    const { isLoading, isFetching } = useUser();

    return (
        <div
            data-is-visible={JSON.stringify(isLoading || isFetching)}
            className="user-loading-overlay"
        >
            <div className="user-loading-overlay__content">
                <Spinner animation="border" />
            </div>
        </div>
    );
};
export default UserLoadingOverlay;
