import { format } from "date-fns";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import React from "react";

interface Approve {
    date: string;
    title: string;
    body: string;
    handleClick?: any;
}

export const ApproveNotify = ({ date, title, body, handleClick }: Approve) => {
    const { data: profile } = useGetProfile();
    return (
        <div className="d-flex align-items-center justify-content-between accepted-notification">
            <div className="d-flex notification-wrapper">
                <figure className="d-flex flex-column justify-content-center notification-image">
                    <Image
                        alt="testimage"
                        src={
                            profile
                                ? profile?.profile_image
                                : "/userprofile/unknownPerson.jpg"
                        }
                        height={50}
                        width={50}
                    />
                </figure>
                <div className="description-section">
                    <p>
                        <span className="span-name"> Your</span> booking detail
                        was {title} for {body} .
                        {/* <span className="span-name"> Need a Gardener.</span> */}
                    </p>

                    <p className="date">
                        {format(new Date(date), "EEEE, do LLL, hh:mm a")}
                    </p>
                </div>
            </div>

            {/* <FontAwesomeIcon icon={faXmark} /> */}
        </div>
    );
};
