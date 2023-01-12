//import "firebase/messaging";

import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { useGetNotification } from "hooks/Notifications/use-notification";
import { useInViewPort } from "hooks/use-in-viewport";
import Link from "next/link";
import React, { useMemo } from "react";
import { Container } from "react-bootstrap";
import type { NotificationResponseProps } from "types/notificationResponseProps";
import { axiosClient } from "utils/axiosClient";
import { getNextPageParam } from "utils/getNextPageParam";

import { NotificationCard } from "./NotificationCard";

export default function GetNotifications() {
    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    const { refetch, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useInfiniteQuery(
            ["notifications"],
            async ({ pageParam = 1 }) => {
                const res = await axiosClient.get(
                    "/notification/?page=" + pageParam
                );
                return res.data;
            },
            {
                getNextPageParam,
            }
        );

    const notifications: NotificationResponseProps["result"] = useMemo(
        () => data?.pages.map((page) => page.result).flat() ?? [],
        [data?.pages]
    );

    const isLastTaskerOnPage = (index: number) =>
        index === notifications?.length - 1;

    const todayNotifications = notifications
        ?.filter((date) => {
            return (
                new Date(date.created_date).getFullYear() ===
                    new Date().getFullYear() &&
                new Date(date.created_date).getMonth() ===
                    new Date().getMonth() &&
                new Date(date.created_date).getDate() === new Date().getDate()
            );
        })
        .map((notification, index) => {
            return (
                <div ref={ref} key={index}>
                    <NotificationCard notification={notification} />
                </div>
            );
        });

    const otherNotifications = notifications
        ?.filter((date) => {
            return (
                new Date(date.created_date).getFullYear() !==
                    new Date().getFullYear() &&
                new Date(date.created_date).getMonth() !==
                    new Date().getMonth() &&
                new Date(date.created_date).getDate() !== new Date().getDate()
            );
        })
        .map((notification, index) => {
            return (
                <div ref={isLastTaskerOnPage(index) ? ref : null} key={index}>
                    <NotificationCard notification={notification} />
                </div>
            );
        });

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
                        todayNotifications
                    )}
                    <div className="header">
                        <h4 className="mt-3">Earlier</h4>
                    </div>
                    {otherNotifications?.length === 0 ? (
                        <p className="text-center">No notifications to show.</p>
                    ) : (
                        otherNotifications
                    )}

                    {/* <AcceptedNotification /> */}
                    {/* <AcceptedNotification /> */}
                    {/* <ApproveNotify /> */}
                </div>
            </Container>
        </section>
    );
}
