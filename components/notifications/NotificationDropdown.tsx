import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { axiosClient } from "utils/axiosClient";

import { ApproveNotify } from "./ApproveNotify";
import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { CreatedTask } from "./dropdown-notifications/CreatedTask";
import { PostNotifyTask } from "./PostedTask";
import { ServiceAccept } from "./ServiceAccept";

export const NotificationDropdown = () => {
    const { data: allNotifications, refetch } = useGetNotification();
    //
    const router = useRouter();
    const queryClient = new QueryClient();

    const [todayNotifications, settodayNotifications] = useState<any[]>(
        () =>
            allNotifications?.result.filter((notify) => {
                const date = new Date(notify.created_date);
                const today = new Date();

                return (
                    date?.getDate() === today.getDate() &&
                    date?.getMonth() === today.getMonth() &&
                    date?.getFullYear() === today.getFullYear()
                );
            }) ?? []
    );

    //const allNotify = allNotifications ? allNotifications.result : [];

    // const removeNotification = (id: string) =>
    //     settodayNotifications((prev) =>
    //         prev.filter((notification) => notification.id !== id)
    //     );

    // if (todayNotifications?.length > 5) {
    //     settodayNotifications((prev) => prev.slice(0, 5));
    // }
    const readSingleNotification = async (
        slug: string,
        id: number,
        type: string
    ) => {
        if (slug !== null) {
            router.push(`/${type}/${slug}`);
        }

        await axiosClient.get(`/notification/read/?id=${id}`);

        refetch();
    };
    console.log("todayNotifications", todayNotifications);

    const renderTodayNotifications = todayNotifications?.map(
        (notification: any, index: number) => {
            if (notification.title === "created") {
                return (
                    <div
                        key={index}
                        onClick={async () => {
                            router.push(`/task/${notification.object_slug}`);
                            await axiosClient.get(
                                `/notification/read/?id=${notification.id}`
                            );

                            await queryClient.invalidateQueries([
                                "notification",
                            ]);
                        }}
                    >
                        {/* <ApproveNotify date={notification.created_date} /> */}
                        <PostNotifyTask
                            read={notification?.read_date}
                            is_requested={notification.is_requested}
                            taskTitle={`${notification.title} a service`}
                            taskObject={notification.object}
                            createdDate={notification.created_date}
                            slug={notification.object_slug}
                            type={"created"}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.object_slug,
                                    notification?.id,
                                    notification?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.type === "task") {
                return (
                    <div key={index}>
                        <PostNotifyTask
                            read={notification?.read_date}
                            is_requested={notification.is_requested}
                            taskTitle={notification?.title}
                            taskObject={notification?.object}
                            createdDate={notification?.created_date}
                            slug={notification?.object_slug}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.object_slug,
                                    notification?.id,
                                    notification?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            }
            // if (notification.type === "entityservice") {
            //     return (
            //         <div key={index}>
            //             <PostNotifyTask
            //                 taskTitle={notification?.title}
            //                 taskObject={notification?.object}
            //                 createdDate={notification?.created_date}
            //                 slug={notification?.object_slug}
            //                 handleClick={() =>
            //                     readSingleNotification(
            //                         notification?.object_slug,
            //                         notification?.id
            //                     )
            //                 }
            //             />
            //         </div>
            //     );
            // }
            // else if (notification.type === "service") {
            //     return (
            //         <div key={index}>
            //             <ServiceAccept />
            //         </div>
            //     );
            // }
            else if (notification.title === "booking") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.object_slug,
                                notification?.id,
                                notification?.is_requested ? "task" : "service"
                            )
                        }
                    >
                        {/* <ApproveNotify
                            body={notification?.object}
                            date={notification?.created_date}
                            title={notification?.title}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.object_slug,
                                    notification?.id
                                )
                            }
                        /> */}
                        <PostNotifyTask
                            read={notification?.read_date}
                            is_requested={notification.is_requested}
                            taskTitle={notification?.title}
                            taskObject={notification?.object}
                            createdDate={notification?.created_date}
                            slug={notification?.object_slug}
                            type={"booked"}
                        />
                    </div>
                );
            } else if (notification.title === "approval") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.object_slug,
                                notification?.id,
                                notification?.is_requested ? "task" : "service"
                            )
                        }
                    >
                        <ApproveNotification
                            read={notification.read_date}
                            bookingId={notification?.object_id}
                            title="booked"
                            body={notification?.object}
                            user={notification?.created_for}
                            accept={true}
                            date={notification?.created_date}
                            type={
                                notification.is_requested ? "task" : "service"
                            }
                        />
                    </div>
                );
            } else if (notification.title === "Approved") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.object_slug,
                                notification?.id,
                                notification?.is_requested ? "task" : "service"
                            )
                        }
                    >
                        <ApproveNotification
                            read={notification?.read_date}
                            is_requested={notification.is_requested}
                            title="Approved"
                            body={notification?.object}
                            user={notification?.created_for}
                            date={notification?.created_date}
                            type="booking"
                            slug={notification?.object_slug}
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
            {/* <ServiceAccept /> */}

            {/* <ApproveNotification pay={true} />
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
