//import "firebase/messaging";

import { QueryClient } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import { PostNotifyTask } from "./PostedTask";

export default function GetNotifications() {
    // const router = useRouter();

    // Handles the click function on the toast showing push notification
    // const handleClickPushNotification = (url) => {
    //     router.push(url);
    // };

    // Get the push notification message and triggers a toast to display it
    // function getMessage() {
    //     const messaging = firebase.messaging();
    //     messaging.onMessage((message) => {
    //         toast(
    //             <div
    //                 onClick={() =>
    //                     handleClickPushNotification(message?.data?.url)
    //                 }
    //             >
    //                 <h5>{message?.notification?.title}</h5>
    //                 <h6>{message?.notification?.body}</h6>
    //             </div>,
    //             {
    //                 closeOnClick: false,
    //             }
    //         );
    //     });
    // }
    const { data: allNotifications, refetch } = useGetNotification();
    const allNotify = allNotifications ? allNotifications.result : [];
    const queryClient = new QueryClient();

    queryClient.invalidateQueries(["notification"]);
    console.log("notifications", allNotifications);
    const todayNotifications = allNotifications?.result.filter((notify) => {
        const date = new Date(notify.created_date);
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    });
    // console.log("today", todayNotifications);
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
    console.log("earlier", earlierNotifications);

    const renderTodayNotifications = todayNotifications?.map(
        (notification, index: number) => {
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
            return;
        }
    );
    const renderEarlierNotifications = earlierNotifications?.map(
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
                    {allNotifications?.result.length === 0 && (
                        <p className="text-center">No notifications to show.</p>
                    )}
                    {renderTodayNotifications}
                    <div className="header">
                        <h4 className="mt-3">Earlier</h4>
                        {allNotifications?.result.length === 0 && (
                            <p className="text-center">
                                No notifications to show.
                            </p>
                        )}
                        {renderEarlierNotifications}
                    </div>

                    {/* <AcceptedNotification />
                    <AcceptedNotification />
                    <ApproveNotify />
                    <ServiceAccept /> */}
                </div>
            </Container>
        </section>
    );
}
