import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";

import { AcceptedNotification } from "./AcceptedNotification";

export default function GetNotifications() {
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
                </div>
            </Container>
        </section>
    );
}
