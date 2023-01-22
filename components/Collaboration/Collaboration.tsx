import { Alert } from "@mantine/core";
import { ErrorOutlineOutlined } from "@mui/icons-material";

export const Collaboration = () => {
    return (
        <Alert icon={<ErrorOutlineOutlined />} title="Feature Coming soon">
            Stay tuned this feature is coming soon!
        </Alert>
    );
};
