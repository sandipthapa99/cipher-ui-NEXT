import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import React from "react";

import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { CreatedTask } from "./dropdown-notifications/CreatedTask";
import { PostNotifyTask } from "./PostedTask";

export const NotificationDropdown = () => {
    const { data: allNotifications } = useGetNotification();
    const queryClient = new QueryClient();

    queryClient.invalidateQueries(["notification"]);
    const todayNotifications = allNotifications?.result.filter((notify) => {
        const date = new Date(notify.created_date);
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    });
    const renderTodayNotifications = todayNotifications?.map(
        (notification, index: number) => {
            if (notification.type === "task") {
                return (
                    <div key={index}>
                        <PostNotifyTask
                            taskTitle={notification.title}
                            taskObject={notification.object}
                            createdDate={notification.created_date}
                            slug={notification.object_slug}
                        />
                    </div>
                );
            }
            return;
        }
    );
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
            {renderTodayNotifications}
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
