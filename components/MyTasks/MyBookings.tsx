import { Alert } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import urls from "constants/urls";
import { useRouter } from "next/router";
import React from "react";
import type { MyBookingServiceProps } from "types/myBookingProps";
import { axiosClient } from "utils/axiosClient";

import { MyTaskOrder } from "./MyTaskOrder";

export interface MyBookingProps {
    id: number;
    created_by: {
        id: number;
        charge_currency: {
            id: number;
            name: string;
            code: string;
            symbol: string;
        };
        user: {
            id: string;
            username: string;
            email: string;
            phone: any;
            first_name: string;
            middle_name: string;
            last_name: string;
        };
        portfolio: Array<any>;
        experience: Array<any>;
        education: Array<any>;
        certificates: Array<any>;
        stats: {
            success_rate: number;
            happy_clients: number;
            task_completed: number;
            user_reviews: number;
            task_assigned: number;
            task_in_progress: number;
            task_cancelled: number;
        };
        rating: {
            user_rating_count: number;
            avg_rating: any;
        };
        country: any;
        language: any;
        city: any;
        status: string;
        bio: string;
        gender: string;
        profile_image: any;
        date_of_birth: any;
        skill: string;
        active_hour_start: string;
        active_hour_end: string;
        experience_level: string;
        user_type: string;
        hourly_rate: number;
        profile_visibility: string;
        task_preferences: string;
        address_line1: string;
        address_line2: string;
        is_profile_verified: boolean;
        designation: string;
        points: number;
        subscription: Array<any>;
        security_questions: Array<any>;
    };
    entity_service: {
        id: string;
        created_by: {
            id: string;
            username: string;
            email: string;
            phone: any;
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
        videos: Array<any>;
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
            "1": string;
            "2": string;
        };
        budget_type: string;
        budget_from: number;
        budget_to: number;
        start_date: any;
        end_date: any;
        start_time: any;
        end_time: any;
        share_location: boolean;
        is_negotiable: boolean;
        revisions: number;
        recursion_type: any;
        views_count: number;
        location: string;
        is_professional: boolean;
        is_online: boolean;
        is_requested: boolean;
        discount_type: any;
        discount_value: any;
        extra_data: Array<any>;
        no_of_reservation: number;
        slug: string;
        is_active: boolean;
        merchant: any;
    };
    images: Array<{
        id: number;
        name: string;
        size: string;
        media_type: string;
        media: string;
    }>;
    videos: Array<any>;
    created_at: string;
    updated_at: string;
    budget_from: number;
    budget_to: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: any;
    location: string;
    is_active: boolean;
    status: string;
    extra_data: any;
    is_accepted: boolean;
    city: number;
}

export const MyBookings = () => {
    const { data: myBookingData } = useQuery<MyBookingProps[]>(
        ["my-booking"],
        async () => {
            const response = await axiosClient.get(`${urls.task.myBookings}`);
            return response.data.result;
        }
    );

    const router = useRouter();
    const renderMyBookings = myBookingData?.map((item, index) => {
        return (
            <div
                className="booking-wrapper"
                key={index}
                onClick={() =>
                    router.push({
                        pathname: `/service/${item?.entity_service?.service?.category?.slug}`,
                    })
                }
            >
                <MyTaskOrder
                    task_id={item?.id.toString()}
                    assigner_id={item?.created_by?.id.toString()}
                    created_at={item?.created_at}
                    image={item?.images[0]?.media}
                    title={item?.entity_service?.service?.title}
                    assigner_name={`${item?.created_by?.user?.first_name} ${item?.created_by?.user?.last_name}`}
                    budget_from={item?.budget_from}
                    budget_to={item?.budget_to}
                    budget_type={item?.entity_service?.budget_type}
                    status={item?.status}
                    currency={item?.entity_service?.currency?.symbol}
                />
            </div>
        );
    });

    return (
        <div className="my-task">
            <h3>My Bookings</h3>

            <div className="my-task__each-orders">
                {myBookingData ? (
                    renderMyBookings
                ) : (
                    <Alert title="NO DATA AVAILABLE !!!" color="orange">
                        Sorry, You have no booking to show.
                    </Alert>
                )}
                {/* {myBookingData?.length ? (
                    myBookingData?.map(
                        (item: MyBookingProps, index: number) => (
                            <div
                                className="booking-wrapper"
                                key={index}
                                onClick={() =>
                                    router.push({
                                        pathname: `/service/${item?.service?.slug}`,
                                    })
                                }
                            >
                                <MyTaskOrder
                                    task_id={item?.service?.id}
                                    assigner_id={item?.service?.created_by?.id}
                                    created_at={item?.created_at}
                                    image={item?.service?.images[0]?.media}
                                    title={item?.service?.title}
                                    assigner_name={
                                        item?.service?.created_by?.full_name
                                    }
                                    budget_from={item?.service?.budget_from}
                                    budget_to={item?.service?.budget_to}
                                    budget_type={item?.service?.budget_type}
                                    status={item?.status}
                                    currency={item?.service?.currency?.symbol}
                                />
                            </div>
                        )
                    )
                ) : (
                    <Alert title="NO DATA AVAILABLE !!!" color="orange">
                        Sorrry, You have no booking data to show
                    </Alert>
                )} */}
            </div>
        </div>
    );
};
