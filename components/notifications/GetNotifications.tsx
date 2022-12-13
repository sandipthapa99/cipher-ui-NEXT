//import "firebase/messaging";

import { QueryClient } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { KycDetails } from "./KycDetails";
import { PostNotifyTask } from "./PostedTask";
import { TaskStatus } from "./TaskStatus";

export default function GetNotifications() {
    // const router = useRouter();

    const { data: allNotifications, refetch } = useGetNotification();
    // const allNotify = allNotifications ? allNotifications.result : [];
    const queryClient = new QueryClient();
    const router = useRouter();

    //
    const todayNotifications = allNotifications?.result.filter((notify) => {
        const date = new Date(notify.created_date);
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    });
    //

    const earlierNotifications = allNotifications?.result.filter((notify) => {
        const date = new Date(notify.created_date);
        const today = new Date();

        return date.getDate() !== today.getDate();
    });
    const readSingleNotification = async (
        slug: string,
        id: number,
        type: string
    ) => {
        if (slug !== null) {
            router.push(`/${type}/${slug}`);
        }

        await axiosClient.post(`/notification/read/?id=${id}`);
        await queryClient.invalidateQueries(["notifications"]);
    };
    //

    const renderTodayNotifications = todayNotifications?.map(
        (notification, index: number) => {
            if (notification.title === "created") {
                return (
                    <div
                        key={index}
                        onClick={async () => {
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
                            taskTitle={`${notification?.content_object.title}`}
                            taskObject={
                                notification?.content_object?.entity_service
                                    ?.title
                            }
                            createdDate={notification.created_date}
                            slug={notification?.content_object?.slug}
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
            } else if (notification.title === "KYC Verification") {
                return (
                    <div
                        key={index}
                        onClick={async () => {
                            await axiosClient.get(
                                `/notification/read/?id=${notification.id}`
                            );

                            await queryClient.invalidateQueries([
                                "notification",
                            ]);
                        }}
                    >
                        <KycDetails
                            userPhoto={notification?.created_for?.profile_image}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.is_requested
                            }
                            createdDate={notification.created_date}
                            handleClick={() => console.log("clicked")}
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
            return;
        }
    );

    const renderEarlierNotifications = earlierNotifications?.map(
        (notification, index: number) => {
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
                            taskTitle={`${notification?.content_object.title}`}
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
            } else if (notification.title === "KYC Verification") {
                return (
                    <div
                        key={index}
                        onClick={async () => {
                            await axiosClient.get(
                                `/notification/read/?id=${notification.id}`
                            );

                            await queryClient.invalidateQueries([
                                "notification",
                            ]);
                        }}
                    >
                        <KycDetails
                            userPhoto={notification?.created_for?.profile_image}
                            read={notification?.read_date}
                            is_requested={
                                notification?.content_object?.is_requested
                            }
                            createdDate={notification.created_date}
                            handleClick={() => console.log("clicked")}
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
            return;
        }
    );

    return (
        <section id="get-notification-section" className="get-notification">
            <Container>
                <h1>Notifications</h1>
                <div className="get-notification__body">
                    <div className="header d-flex justify-content-between">
                        <h4>Today</h4>

                        <Link href="">
                            <a
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
                            </a>
                        </Link>
                    </div>
                    {todayNotifications?.length === 0 ? (
                        <p className="text-center">
                            No today&apos;s notifications to show.
                        </p>
                    ) : (
                        renderTodayNotifications
                    )}
                    <div className="header">
                        <h4 className="mt-3">Earlier</h4>
                        {allNotifications?.result.length === 0 && (
                            <p className="text-center">
                                No notifications to show.
                            </p>
                        )}
                        {renderEarlierNotifications}
                    </div>

                    {/* <AcceptedNotification /> */}
                    {/* <AcceptedNotification /> */}
                    {/* <ApproveNotify /> */}
                </div>
            </Container>
        </section>
    );
}
