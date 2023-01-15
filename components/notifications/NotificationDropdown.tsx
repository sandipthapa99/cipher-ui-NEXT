import { ScrollArea } from "@mantine/core";
import { NotificationsOutlined } from "@mui/icons-material";
import { useGetNotification } from "hooks/Notifications/use-notification";
import { useInViewPort } from "hooks/use-in-viewport";
import Link from "next/link";
import React, { useMemo } from "react";
import type { NotificationResponseProps } from "types/notificationResponseProps";
import { axiosClient } from "utils/axiosClient";

import { NotificationCard } from "./NotificationCard";

export const NotificationDropdown = () => {
    const { ref } = useInViewPort<HTMLDivElement>(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    });

    const { refetch, data, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useGetNotification();

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
        <div className="notification-dropdown">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex notification-title align-items-center">
                    <NotificationsOutlined />
                    <h3>Notifications</h3>
                </div>
                <p
                    className="mark mb-0 pe-4"
                    onClick={async () => {
                        const response = await axiosClient.post(
                            "/notification/read/"
                        );

                        if (response.status === 200) {
                            refetch();
                        }
                    }}
                >
                    Mark all as read
                </p>
            </div>
            <ScrollArea.Autosize
                maxHeight={500}
                offsetScrollbars
                scrollbarSize={5}
            >
                <div className="d-flex justify-content-between second-title"></div>
                <p className="today ps-4">Today</p>
                {todayNotifications?.length > 0 ? (
                    todayNotifications
                ) : (
                    <p className="text-center">
                        No today&apos;s notifications to show.
                    </p>
                )}
                <p className="today ps-4 my-4">Earlier</p>
                {otherNotifications?.length < 0 ? (
                    <p className="text-center">No notifications to show.</p>
                ) : (
                    otherNotifications
                )}
            </ScrollArea.Autosize>
            <div className="d-flex align-items-center justify-content-center footer-section">
                <Link href="/notifications">
                    <a>See all Notifications</a>
                </Link>
            </div>
        </div>
    );
};
