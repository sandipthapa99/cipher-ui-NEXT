import { showNotification } from "@mantine/notifications";
import { CheckCircleOutline, ErrorOutlineOutlined } from "@mui/icons-material";
import type { ReactNode } from "react";

export const toast = {
    error: (message: ReactNode) =>
        showNotification({
            title: "Error",
            message,
            color: "red",
            icon: <ErrorOutlineOutlined />,
        }),
    success: (message: ReactNode) =>
        showNotification({
            title: "Success",
            message,
            color: "green",
            icon: <CheckCircleOutline />,
        }),
    showComponent: (title: string, component: ReactNode) => {
        showNotification({
            id: new Date().getTime().toString(),
            color: "yellow",
            title,
            message: component,
            autoClose: false,
            disallowClose: true,
        });
    },
    message: (message: ReactNode) => {
        showNotification({
            title: "Message",
            message,
            color: "blue",
            icon: <ErrorOutlineOutlined />,
        });
    },
};
