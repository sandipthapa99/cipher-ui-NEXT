import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

import { AcceptReject } from "./AcceptReject";

export const AcceptedNotification = () => {
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
                    <h4>
                        Harry Smith <span>has completed your task</span>
                    </h4>
                    <p className="main-desc">
                        I want to revise task from last week for our bunglow who
                        can gre at take care of our plants, includes monitoring
                        and overall.
                    </p>
                    <p className="date">Yesterday 03:30 PM</p>
                </div>
            </div>

            <AcceptReject />
            <FontAwesomeIcon icon={faXmark} />
        </div>
    );
};
