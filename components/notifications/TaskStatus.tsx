import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface TaskStatusProps {
    taskTitle: string;
    taskObject: string;
    createdDate: string;
    slug: string;
    handleClick?: any;
    name?: string;
    type?: string;
    is_requested: boolean;
    read?: string | null;
    created_for: string;
    notificationTaskStatus: string;
    userPhoto: string;
}

export const TaskStatus = ({
    taskObject,
    createdDate,
    handleClick,
    slug,
    is_requested,
    read,
    created_for,
    notificationTaskStatus,
    userPhoto,
}: TaskStatusProps) => {
    const router = useRouter();

    return (
        <div
            className="d-flex align-items-center justify-content-between accepted-notification"
            style={{ backgroundColor: read === null ? "#ecf7ff" : "##f8f9fa" }}
            // onClick={() => {
            //     is_requested
            //         ? router.push(`/task/${slug}`)
            //         : router.push(`/task/${slug}`);

            // }}
        >
            <div className="d-flex notification-wrapper">
                <figure className="d-flex flex-column justify-content-center notification-image">
                    <Image
                        alt="testimage"
                        src={
                            userPhoto ? userPhoto : "/logo/homaale-favicon.png"
                        }
                        height={50}
                        width={50}
                    />
                </figure>
                <div className="description-section">
                    <p>
                        <span className="span-name" onClick={handleClick}>
                            {created_for} has{" "}
                        </span>
                        {notificationTaskStatus} your{" "}
                        {is_requested ? "task" : "service"}
                        <span
                            className="span-name"
                            onClick={() => {
                                {
                                    is_requested
                                        ? router.push(`/task/${slug}`)
                                        : router.push(`/service/${slug}`);
                                }
                            }}
                        >
                            {" "}
                            {taskObject}.
                        </span>
                    </p>

                    <p className="date">
                        {formatDistanceToNow(new Date(createdDate), {
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};
