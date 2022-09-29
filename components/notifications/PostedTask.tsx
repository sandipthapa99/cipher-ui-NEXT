import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import type { NotificationResponse } from "hooks/Notifications/use-notification";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { AcceptReject } from "./AcceptReject";
interface PostedNotifyProps {
    taskTitle: string;
    taskObject: string;
    createdDate: string;
    slug: string;
    handleClick?: any;
    name?: string;
    type?: string;
    is_requested: boolean;
}

export const PostNotifyTask = ({
    taskTitle,
    taskObject,
    createdDate,
    handleClick,
    name,
    slug,
    is_requested,
    type,
}: PostedNotifyProps) => {
    const { data: profile } = useGetProfile();
    const router = useRouter();

    return (
        <div className="d-flex align-items-center justify-content-between accepted-notification">
            <div className="d-flex notification-wrapper">
                <figure className="d-flex flex-column justify-content-center notification-image">
                    <Image
                        alt="testimage"
                        src={
                            profile?.profile_image ??
                            "/userprofile/unknownPerson.jpg"
                        }
                        height={50}
                        width={50}
                    />
                </figure>
                <div className="description-section">
                    <p>
                        <span className="span-name" onClick={handleClick}>
                            You{" "}
                        </span>
                        {type} a {is_requested ? "task" : "service"}
                        <span
                            className="span-name"
                            onClick={() => {
                                router.push(`/service/${slug}`);
                            }}
                        >
                            {" "}
                            {taskObject}.
                        </span>
                    </p>

                    <p className="date">
                        {format(new Date(createdDate), "EEEE, do LLL, hh:mm a")}
                    </p>
                </div>
            </div>

            {/* <FontAwesomeIcon icon={faXmark} /> */}
        </div>
    );
};
