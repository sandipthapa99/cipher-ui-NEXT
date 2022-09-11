import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside } from "@mantine/hooks";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { CreatedTask } from "./dropdown-notifications/CreatedTask";

interface NotificationDropdownProps {
    setNotOpen: Dispatch<SetStateAction<boolean>>;
}

export const NotificationDropdown = ({
    setNotOpen,
}: NotificationDropdownProps) => {
    const notificationRef = useClickOutside(() => setNotOpen(false));

    return (
        <div className="notification-dropdown" ref={notificationRef}>
            <div className="d-flex notification-title align-items-center">
                <FontAwesomeIcon icon={faBell} />
                <h3>Notifications</h3>
            </div>
            <div className="d-flex justify-content-between second-title">
                <p className="today">Today</p>
                <p className="mark">Mark all as read</p>
            </div>

            {/* <ApproveNotification accept={true} />
            <ApproveNotification pay={true} />
            <CreatedTask />
            <CreatedTask text_after="for Bathroom" /> */}

            <div className="d-flex align-items-center justify-content-center footer-section">
                <Link href="/notifications">
                    <a>See all Notifications</a>
                </Link>
            </div>
        </div>
    );
};
