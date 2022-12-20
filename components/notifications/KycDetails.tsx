import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React from "react";

interface KycDetailsProps {
    taskTitle?: string;
    taskObject?: string;
    createdDate: string;
    slug?: string;
    handleClick?: any;
    name?: string;
    type?: string;
    is_requested: boolean;
    read?: string | null;
    userPhoto: string;
}

export const KycDetails = ({
    createdDate,
    handleClick,
    is_requested,

    read,
    userPhoto,
}: KycDetailsProps) => {
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
                            userPhoto
                                ? userPhoto
                                : "/userprofile/unknownPerson.jpg"
                        }
                        height={50}
                        width={50}
                    />
                </figure>
                <div className="description-section">
                    {is_requested ? (
                        <p>
                            <span className="span-name" onClick={handleClick}>
                                Your{" "}
                            </span>
                            Kyc has been approved
                            {/* <span
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
                            </span> */}
                        </p>
                    ) : (
                        <p>
                            <span className="span-name" onClick={handleClick}>
                                Your{" "}
                            </span>
                            Kyc has been declined
                            {/* <span
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
                            </span> */}
                        </p>
                    )}

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
