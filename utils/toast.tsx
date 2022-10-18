import {
    faCheckCircle,
    faExclamationCircle,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showNotification } from "@mantine/notifications";
import type { ReactNode } from "react";

export const toast = {
    error: (message: ReactNode) =>
        showNotification({
            title: "Error",
            message,
            color: "red",
            icon: <FontAwesomeIcon icon={faExclamationCircle} />,
        }),
    success: (message: ReactNode) =>
        showNotification({
            title: "Success",
            message,
            color: "green",
            icon: <FontAwesomeIcon icon={faCheckCircle} />,
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
};
