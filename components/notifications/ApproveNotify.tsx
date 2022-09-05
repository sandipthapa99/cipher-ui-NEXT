import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

import { AcceptReject } from "./AcceptReject";

export const ApproveNotify = () => {
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
                        <span className="span-name"> Sristi Sharma</span> has
                        approved your task{" "}
                        <span className="span-name"> Need a Gardener.</span>
                    </p>

                    <p className="date">Yesterday 03:30 PM</p>
                </div>
            </div>

            <FontAwesomeIcon icon={faXmark} />
        </div>
    );
};
