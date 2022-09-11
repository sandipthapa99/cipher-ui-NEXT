import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

import { AcceptReject } from "./AcceptReject";
interface PostedNotifyProps {
    taskTitle: string;
    taskObject: string;
    createdDate: string;
}

export const PostNotifyTask = ({
    taskTitle,
    taskObject,
    createdDate,
}: PostedNotifyProps) => {
    return (
        <div className="d-flex align-items-center justify-content-between accepted-notification">
            <div className="d-flex notification-wrapper">
                <figure className="d-flex flex-column justify-content-center notification-image">
                    <Image
                        alt="testimage"
                        src="/community/blog1.png"
                        height={50}
                        width={50}
                    />
                </figure>
                <div className="description-section">
                    <p>
                        <span className="span-name">You</span> have posted a
                        task with {taskTitle} for
                        <span className="span-name"> {taskObject}</span>
                    </p>

                    <p className="date">
                        {format(new Date(createdDate), "yyyy-MM-dd")}
                    </p>
                </div>
            </div>

            <FontAwesomeIcon icon={faXmark} />
        </div>
    );
};
