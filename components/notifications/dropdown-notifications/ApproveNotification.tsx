import Image from "next/image";
import React from "react";

import { AcceptReject } from "../AcceptReject";
import { Pay } from "../Pay";

interface ApproveNotificationProps {
    accept?: boolean;
    pay?: boolean;
}

export const ApproveNotification = ({
    accept,
    pay,
}: ApproveNotificationProps) => {
    return (
        <div className="d-flex approve-notification-dropdown">
            <figure className="dropdown-notification-image">
                <Image
                    alt="testimage"
                    src="/userprofile/unknownPerson.jpg"
                    height={50}
                    width={50}
                />
            </figure>
            <div className="description-section">
                <h4>
                    Aiony Haust{" "}
                    <span> is interested in your task Need a Gardener</span>
                </h4>
                <p>
                    I want to revise task from last week for our bunglow who can
                    gre at take care of our plants, includes monitoring and
                    overall.
                </p>
                <div className="d-flex align-items-center justify-content-between date-approve-section">
                    <p className="date">Tuesday 03:30 AM</p>
                    {accept && <AcceptReject />}
                    {pay && <Pay />}
                </div>
            </div>
        </div>
    );
};
