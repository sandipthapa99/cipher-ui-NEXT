import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { axiosClient } from "utils/axiosClient";

import { AcceptReject } from "../AcceptReject";
import { Pay } from "../Pay";

interface BookingDetails {
    id: number;
    created_by: string;
    entity_service: {
        id: string;
        created_by: {
            id: string;
            username: string;
            email: string;
            phone: string;
            first_name: string;
            middle_name: string;
            last_name: string;
            profile_image: string;
            bio: string;
        };
        currency: {
            id: number;
            name: string;
            code: string;
            symbol: string;
        };
        city: {
            id: number;
            name: string;
            latitude: number;
            longitude: number;
            country: {
                id: number;
                name: string;
            };
        };
        images: Array<{
            id: number;
            name: string;
            size: string;
            media_type: string;
            media: string;
        }>;
        videos: Array<{
            id: number;
            name: string;
            size: string;
            media_type: string;
            media: string;
        }>;
        service: {
            id: string;
            title: string;
            is_active: boolean;
            is_verified: boolean;
            category: {
                id: number;
                name: string;
                level: number;
                slug: string;
            };
        };
        created_at: string;
        updated_at: string;
        title: string;
        description: string;
        highlights: {
            additionalProp1: string;
            additionalProp2: string;
            additionalProp3: string;
        };
        budget_type: string;
        budget_from: number;
        budget_to: number;
        start_date: string;
        end_date: string;
        start_time: string;
        end_time: string;
        share_location: boolean;
        is_negotiable: boolean;
        revisions: number;
        recursion_type: string;
        views_count: number;
        location: string;
        is_professional: boolean;
        is_online: boolean;
        is_requested: boolean;
        discount_type: string;
        discount_value: number;
        extra_data: {
            additionalProp1: string;
            additionalProp2: string;
            additionalProp3: string;
        };
        no_of_reservation: number;
        slug: string;
        is_active: boolean;
        merchant: number;
    };
    images: Array<{
        id: number;
        name: string;
        size: string;
        media_type: string;
        media: string;
    }>;
    videos: Array<{
        id: number;
        name: string;
        size: string;
        media_type: string;
        media: string;
    }>;
    created_at: string;
    updated_at: string;
    budget_from: number;
    budget_to: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    location: string;
    is_active: boolean;
    status: string;
    extra_data: {
        additionalProp1: string;
        additionalProp2: string;
        additionalProp3: string;
    };
    is_accepted: boolean;
    city: number;
}
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
    is_requested?: boolean;
    read?: string;
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
    is_requested,
    read,
}: ApproveNotificationProps) => {
    const { data: bookingData } = useQuery<BookingDetails>(
        ["booking", bookingId],
        async () => {
            const response = await axiosClient.get(
                `/task/entity/service-booking/${bookingId}`
            );
            return response.data;
        }
    );

    return (
        <div
            className="d-flex approve-notification-dropdown"
            style={{ backgroundColor: read === null ? "#ecf7ff" : "#ebf9f1" }}
        >
            <div className="d-flex">
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
                            has {title} your {type} for{" "}
                            <span className="service-name-notify">{body}.</span>
                        </span>
                    </h4>
                    {/* <p>
                    I want to revise task from last week for our bunglow who can
                    gre at take care of our plants, includes monitoring and
                    overall.
                </p> */}
                    <div className=" mt-1 date-approve-section">
                        <p className="date m-0">
                            {date
                                ? format(
                                      new Date(date),
                                      "EEEE, do LLL, hh:mm a"
                                  )
                                : ""}
                        </p>

                        {/* {pay && <Pay />} */}
                    </div>
                </div>
            </div>
            <div>
                {accept && (
                    <AcceptReject
                        accepted={bookingData?.is_accepted}
                        slug={slug}
                        type={type}
                    />
                )}
            </div>
        </div>
    );
};
