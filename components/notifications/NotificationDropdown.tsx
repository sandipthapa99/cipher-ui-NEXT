import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { axiosClient } from "utils/axiosClient";

import { ApproveNotify } from "./ApproveNotify";
import { PostNotifyTask } from "./PostedTask";
import { ServiceAccept } from "./ServiceAccept";

export const NotificationDropdown = () => {
    const { data: allNotifications, refetch } = useGetNotification();
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

    if (todayNotifications.length > 5) {
        settodayNotifications((prev) => prev.slice(0, 5));
    }

    const renderTodayNotifications = todayNotifications?.map(
        (notification: any, index: number) => {
            // if (notification.type === "entityservice") {
            //     return (
            //         <div
            //             key={index}
            //             onClick={async () => {
            //                 router.push(`/task/${notification.object_slug}`);
            //                 await axiosClient.get(
            //                     `/notification/read/?id=${notification.id}`
            //                 );

            //                 // // await queryClient.invalidateQueries([
            //                 // //     "notification",
            //                 // // ]);
            //             }}
            //         >
            //             {/* <ApproveNotify date={notification.created_date} /> */}
            //             <PostNotifyTask
            //                 taskTitle={`${notification.title} a service`}
            //                 taskObject={notification.object}
            //                 createdDate={notification.created_date}
            //                 slug={notification.object_slug}
            //             />
            //         </div>
            //     );
            // }
            if (notification.type === "task") {
                return (
                    <div key={index}>
                        <PostNotifyTask
                            taskTitle={notification?.title}
                            taskObject={notification?.object}
                            createdDate={notification?.created_date}
                            slug={notification?.object_slug}
                        />
                    </div>
                );
            }
            if (notification.type === "entityservice") {
                return (
                    <div key={index}>
                        <PostNotifyTask
                            taskTitle={notification?.title}
                            taskObject={notification?.object}
                            createdDate={notification?.created_date}
                            slug={notification?.object_slug}
                        />
                    </div>
                );
            } else if (notification.type === "service") {
                return (
                    <div key={index}>
                        <ServiceAccept />
                    </div>
                );
            } else if (notification.type === "booking") {
                return (
                    <div key={index}>
                        <ApproveNotify
                            body={notification?.object}
                            date={notification?.created_date}
                            title={notification?.title}
                        />
                    </div>
                );
            }
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
                            refetch();
                            // await queryClient.invalidateQueries([
                            //     "notification",
                            // ]);
                        }
                        // queryClient.invalidateQueries(["notification"]);
                    }}
                >
                    Mark all as read
                </p>
            </div>
            {todayNotifications.length === 0 && (
                <p className="text-center">
                    No today&apos;s notifications to show.
                </p>
            )}
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
