//import "firebase/messaging";

import { QueryClient } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import { AcceptedNotification } from "./AcceptedNotification";
import { ApproveNotify } from "./ApproveNotify";
import { ApproveNotification } from "./dropdown-notifications/ApproveNotification";
import { PostNotifyTask } from "./PostedTask";
import { ServiceAccept } from "./ServiceAccept";

export default function GetNotifications() {
    // const router = useRouter();

    const { data: allNotifications, refetch } = useGetNotification();
    const allNotify = allNotifications ? allNotifications.result : [];
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
    // if (allNotifications?.data?.result.length === 0) {
    //     return (
    //         <Container fluid>
    //             <div className="get-notification__body">
    //                 <div className="header d-flex justify-content-between">
    //                     <h4 className="text-align-center">No Notifications to show.</h4>
    //                 </div>
    //             </div>
    //         </Container>
    //     );
    // }
    const earlierNotifications = allNotifications?.result.filter((notify) => {
        const date = new Date(notify.created_date);
        const today = new Date();

        return date.getDate() !== today.getDate();
    });
    const readSingleNotification = async (slug: string, id: number) => {
        router.push(`/service/${slug}`);
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
                            taskTitle={`${notification.title} a service`}
                            taskObject={notification.object}
                            createdDate={notification.created_date}
                            slug={notification.object_slug}
                            type={"created"}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.object_slug,
                                    notification?.id
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.type === "task") {
                return (
                    <div key={index}>
                        <PostNotifyTask
                            taskTitle={notification?.title}
                            taskObject={notification?.object}
                            createdDate={notification?.created_date}
                            slug={notification?.object_slug}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.object_slug,
                                    notification?.id
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
            else if (notification.title === "booked") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.object_slug,
                                notification?.id
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
                                notification?.id
                            )
                        }
                    >
                        <ApproveNotification
                            bookingId={notification?.object_id}
                            title="booked"
                            body={notification?.object}
                            user={notification?.created_for}
                            accept={true}
                            date={notification?.created_date}
                            type="service"
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
                                notification?.id
                            )
                        }
                    >
                        <ApproveNotification
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
                            taskTitle={`${notification.title} a service`}
                            taskObject={notification.object}
                            createdDate={notification.created_date}
                            slug={notification.object_slug}
                            type={"created"}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.object_slug,
                                    notification?.id
                                )
                            }
                        />
                    </div>
                );
            } else if (notification.type === "task") {
                return (
                    <div key={index}>
                        <PostNotifyTask
                            taskTitle={notification?.title}
                            taskObject={notification?.object}
                            createdDate={notification?.created_date}
                            slug={notification?.object_slug}
                            handleClick={() =>
                                readSingleNotification(
                                    notification?.object_slug,
                                    notification?.id
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
            else if (notification.title === "booked") {
                return (
                    <div
                        key={index}
                        onClick={() =>
                            readSingleNotification(
                                notification?.object_slug,
                                notification?.id
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
                                notification?.id
                            )
                        }
                    >
                        <ApproveNotification
                            bookingId={notification?.object_id}
                            title="booked"
                            body={notification?.object}
                            user={notification?.created_for}
                            accept={true}
                            date={notification?.created_date}
                            type="service"
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
                                notification?.id
                            )
                        }
                    >
                        <ApproveNotification
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
