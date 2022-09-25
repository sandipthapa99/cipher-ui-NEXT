import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { axiosClient } from "utils/axiosClient";

import { AcceptReject } from "../AcceptReject";
import { Pay } from "../Pay";

interface ApproveNotificationProps {
    accept?: boolean;
    pay?: boolean;
    title?: string;
    body?: string;
    user?: string;
    date?: string;
    type?: string;
    slug?: string;
    bookingId?: string;
}

export const ApproveNotification = ({
    user,
    accept,
    pay,
    title,
    body,
    date,
    type,
    slug,
    bookingId,
}: ApproveNotificationProps) => {
    const { data: bookingData } = useQuery(["booking", bookingId], async () => {
        return axiosClient.get(`/task/entity/service-booking/${bookingId}`);
    });
    console.log("book", bookingData);

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
                    {user}{" "}
                    <span>
                        has {title} your {type}{" "}
                        <span className="service-name-notify">{body}.</span>
                    </span>
                </h4>
                {/* <p>
                    I want to revise task from last week for our bunglow who can
                    gre at take care of our plants, includes monitoring and
                    overall.
                </p> */}
                <div className="d-flex mt-1 align-items-center justify-content-between date-approve-section">
                    <p className="date m-0">
                        {date
                            ? format(new Date(date), "EEEE, do LLLL yyyy")
                            : ""}
                    </p>
                    {accept && <AcceptReject slug={slug} />}
                    {pay && <Pay />}
                </div>
            </div>
        </div>
    );
};
