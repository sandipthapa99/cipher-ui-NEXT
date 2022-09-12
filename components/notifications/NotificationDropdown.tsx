import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside } from "@mantine/hooks";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";

import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { CreatedTask } from "./dropdown-notifications/CreatedTask";
import { PostNotifyTask } from "./PostedTask";

export const NotificationDropdown = () => {
    const { data: allNotifications } = useGetNotification();
    const queryClient = new QueryClient();
    // console.log("all", allNotifications);
    const router = useRouter();

    const [todayNotifications, settodayNotifications] = useState<any[]>(
        () =>
            allNotifications?.result.filter((notify) => {
                const date = new Date(notify.created_date);
                const today = new Date();

                return (
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
                );
            }) ?? []
    );

    //const allNotify = allNotifications ? allNotifications.result : [];

    // const removeNotification = (id: string) =>
    //     settodayNotifications((prev) =>
    //         prev.filter((notification) => notification.id !== id)
    //     );

    const renderTodayNotifications = todayNotifications?.map(
        (notification: any, index: number) => {
            if (notification.type === "task") {
                return (
                    <div
                        key={index}
                        onClick={async () => {
                            router.push(`/task/${notification.object_slug}`);
                            await axiosClient.get(
                                `/notification/read/?id=${notification.id}`
                            );

                            // // await queryClient.invalidateQueries([
                            // //     "notification",
                            // // ]);
                        }}
                    >
                        <PostNotifyTask
                            taskTitle={notification.title}
                            taskObject={notification.object}
                            createdDate={notification.created_date}
                            slug={notification.object_slug}
                        />
                    </div>
                );
            }
            return null;
        }
    );

    // const readSinggleNotificationMutation = allNotifications?.result?.map(
    //     (item) => {
    //         return item?.id !== item?.id;
    //     }
    // );

    return (
        <div className="notification-dropdown">
            <div className="d-flex notification-title align-items-center">
                <FontAwesomeIcon icon={faBell} />
                <h3>Notifications</h3>
            </div>
            <div className="d-flex justify-content-between second-title">
                <p className="today">Today</p>
                <p
                    className="mark"
                    onClick={async () => {
                        const response = await axiosClient.get(
                            "/notification/read/"
                        );
                        console.log(response);
                        if (response.status === 200) {
                            console.log("read");
                            queryClient.invalidateQueries(["notification"]);
                        }
                        // queryClient.invalidateQueries(["notification"]);
                    }}
                >
                    Mark all as read
                </p>
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
