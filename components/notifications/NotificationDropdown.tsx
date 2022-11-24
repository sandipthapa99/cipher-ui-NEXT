import { faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { axiosClient } from "utils/axiosClient";

import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { KycDetails } from "./KycDetails";
import { PostNotifyTask } from "./PostedTask";
import { TaskStatus } from "./TaskStatus";

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

    const renderNotifications = allNotifications?.result
        .slice(0, 5)
        .map((notification, index) => {
            if (notification.title === "created") {
                return (
                    <div
                        key={index}
                        onClick={async () => {
                            router.push(
                                `/task/${notification?.content_object?.slug}`
                            );
                            await axiosClient.get(
                                `/notification/read/?id=${notification.id}`
                            );

                            await queryClient.invalidateQueries([
                                "notification",
                            ]);
                        }}
                    >
                        <PostNotifyTask
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.is_requested
                            }
                            taskTitle={`${notification.title} a service`}
                            taskObject={notification?.content_object?.title}
                            createdDate={notification.created_date}
                            slug={notification?.content_object?.slug}
                            type={"created"}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.slug,
                                    notification?.id,
                                    notification?.content_object?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "status completed") {
                return (
                    <div key={index}>
                        <TaskStatus
                            userPhoto={notification?.created_for?.profile_image}
                            created_for={notification?.created_for?.full_name}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            taskTitle={notification?.title}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification?.created_date}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            notificationTaskStatus="completed"
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.entity_service
                                        ?.slug,
                                    notification?.id,
                                    notification?.content_object?.entity_service
                                        ?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "status closed") {
                return (
                    <div key={index}>
                        <TaskStatus
                            userPhoto={notification?.created_for?.profile_image}
                            created_for={notification?.created_for?.full_name}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            taskTitle={notification?.title}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification?.created_date}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            notificationTaskStatus="closed"
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.entity_service
                                        ?.slug,
                                    notification?.id,
                                    notification?.content_object?.entity_service
                                        ?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "booking") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.content_object?.entity_service
                                    ?.slug,
                                notification?.id,
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
                            )
                        }
                    >
                        <PostNotifyTask
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            taskTitle={notification?.title}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification?.created_date}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            type={"booked"}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.entity_service
                                        ?.slug,
                                    notification?.id,
                                    notification?.content_object?.entity_service
                                        ?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "approval") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.content_object?.entity_service
                                    ?.slug,
                                notification?.id,
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
                            )
                        }
                    >
                        <ApproveNotification
                            userPhoto={notification?.created_for?.profile_image}
                            read={notification.read_date}
                            bookingId={notification?.content_object?.id}
                            title="booked"
                            body={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            user={notification?.created_for?.full_name}
                            accept={true}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            date={notification?.created_date}
                            type={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
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
                                notification?.content_object?.entity_service
                                    ?.slug,
                                notification?.id,
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
                            )
                        }
                    >
                        <ApproveNotification
                            userPhoto={notification?.created_for?.profile_image}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            title="Approved"
                            body={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            user={notification?.created_for?.full_name}
                            date={notification?.created_date}
                            type="booking"
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                        />
                    </div>
                );
            }
        });

    const renderTodayNotifications = todayNotifications?.map(
        (notification: any, index: number) => {
            if (notification.title === "created") {
                return (
                    <div
                        key={index}
                        onClick={async () => {
                            router.push(
                                `/task/${notification?.content_object?.entity_service?.slug}`
                            );
                            await axiosClient.get(
                                `/notification/read/?id=${notification.id}`
                            );

                            await queryClient.invalidateQueries([
                                "notification",
                            ]);
                        }}
                    >
                        <PostNotifyTask
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            taskTitle={`${notification.title} a service`}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification.created_date}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            type={"created"}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.entity_service
                                        ?.slug,
                                    notification?.id,
                                    notification?.content_object?.entity_service
                                        ?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "status completed") {
                return (
                    <div key={index}>
                        <TaskStatus
                            userPhoto={notification?.created_for?.profile_image}
                            created_for={notification?.created_for?.full_name}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            taskTitle={notification?.title}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification?.created_date}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            notificationTaskStatus="completed"
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.entity_service
                                        ?.slug,
                                    notification?.id,
                                    notification?.content_object?.entity_service
                                        ?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "status closed") {
                return (
                    <div key={index}>
                        <TaskStatus
                            userPhoto={notification?.created_for?.profile_image}
                            created_for={notification?.created_for?.full_name}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            taskTitle={notification?.title}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification?.created_date}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            notificationTaskStatus="closed"
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.entity_service
                                        ?.slug,
                                    notification?.id,
                                    notification?.content_object?.entity_service
                                        ?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "booking") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.content_object?.entity_service
                                    ?.slug,
                                notification?.id,
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
                            )
                        }
                    >
                        <PostNotifyTask
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            taskTitle={notification?.title}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification?.created_date}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            type={"booked"}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.content_object?.entity_service
                                        ?.slug,
                                    notification?.id,
                                    notification?.content_object?.entity_service
                                        ?.is_requested
                                        ? "task"
                                        : "service"
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.title === "approval") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.content_object?.entity_service
                                    ?.slug,
                                notification?.id,
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
                            )
                        }
                    >
                        <ApproveNotification
                            userPhoto={notification?.created_for?.profile_image}
                            read={notification.read_date}
                            bookingId={notification?.content_object?.id}
                            title="booked"
                            body={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            user={notification?.created_for?.full_name}
                            accept={true}
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                            date={notification?.created_date}
                            type={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
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
                                notification?.content_object?.entity_service
                                    ?.slug,
                                notification?.id,
                                notification?.content_object?.entity_service
                                    ?.is_requested
                                    ? "task"
                                    : "service"
                            )
                        }
                    >
                        <ApproveNotification
                            userPhoto={notification?.created_for?.profile_image}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.entity_service
                                    ?.is_requested
                            }
                            title="Approved"
                            body={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            user={notification?.created_for?.full_name}
                            date={notification?.created_date}
                            type="booking"
                            slug={
                                notification?.content_object?.entity_service
                                    ?.slug
                            }
                        />
                    </div>
                );
            }
        }
    );

    const readSinggleNotificationMutation = allNotifications?.result?.map(
        (item) => {
            return item?.id !== item?.id;
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

            {todayNotifications.length !== 0
                ? renderTodayNotifications
                : renderNotifications}
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
