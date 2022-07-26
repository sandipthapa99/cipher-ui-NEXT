import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { AcceptedNotification } from "./AcceptedNotification";
import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";

export const NotificationDropdown = () => {
    return (
        <div className="notification-dropdown">
            <div className="d-flex notification-title align-items-center">
                <FontAwesomeIcon icon={faBell} />
                <h3>Notifications</h3>
            </div>
            <div className="d-flex justify-content-between second-title">
                <p className="today">Today</p>
                <p className="mark">Mark all as read</p>
            </div>

            <ApproveNotification />
        </div>
    );
};
