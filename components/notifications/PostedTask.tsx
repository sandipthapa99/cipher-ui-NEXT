import { formatDistanceToNow } from "date-fns";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface PostedNotifyProps {
    taskTitle: string;
    taskObject: string;
    createdDate: string;
    slug: string;
    handleClick?: any;
    name?: string;
    type?: string;
    is_requested: boolean;
    read?: string | null;
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
    read,
}: PostedNotifyProps) => {
    const { data: profile } = useGetProfile();
    const router = useRouter();

    return (
        <div
            className="d-flex align-items-center justify-content-between accepted-notification"
            style={{ backgroundColor: read === null ? "#ecf7ff" : "#f8f9fa" }}
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
                        {type} a {is_requested ? "task" : "service"} {taskTitle}
                        .
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

            {/* <FontAwesomeIcon icon={faXmark} /> */}
        </div>
    );
};
