import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { AcceptedNotification } from "./AcceptedNotification";
import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { CreatedTask } from "./dropdown-notifications/CreatedTask";
import Link from "next/link";
import { Pay } from "./Pay";

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

            <ApproveNotification accept={true} />
            <ApproveNotification pay={true} />
            <CreatedTask />
            <CreatedTask text_after="for Bathroom" />

            <div className="d-flex align-items-center justify-content-center footer-section">
                <Link href="/notifications">
                    <a>See all Notifications</a>
                </Link>
            </div>
        </div>
    );
};
