import "firebase/messaging";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import { AcceptedNotification } from "./AcceptedNotification";
import { ApproveNotify } from "./ApproveNotify";
import { ServiceAccept } from "./ServiceAccept";

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
    return (
        <section id="get-notification-section" className="get-notification">
            <Container>
                <h1>Notifications</h1>
                <div className="get-notification__body">
                    <div className="header d-flex justify-content-between">
                        <h4>Today</h4>
                        <Link href="">
                            <a>Mark all as read</a>
                        </Link>
                    </div>
                    <AcceptedNotification />
                    <AcceptedNotification />
                    <ApproveNotify />
                    <ServiceAccept />
                </div>
            </Container>
        </section>
    );
}
