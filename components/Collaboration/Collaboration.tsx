import { faWarning } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mantine/core";

export const Collaboration = () => {
    return (
        <Alert
            icon={<FontAwesomeIcon icon={faWarning} />}
            title="Feature Coming soon"
        >
            Stay tuned this feature is coming soon!
        </Alert>
    );
};
