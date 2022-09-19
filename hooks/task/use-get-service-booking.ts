import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";
export type MyBookings = {
    result: Array<{
        id: number;
        created_by: {
            id: string;
            username: string;
            email: string;
            phone: any;
            full_name: string;
            profile_image: any;
        };
        entity_service: {
            id: number;
            created_by: {
                id: string;
                username: string;
                email: string;
                phone: any;
                full_name: string;
                profile_image: string;
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
            merchant: any;
        };
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
        images: Array<number>;
        videos: Array<any>;
    }>;
};

export const useGetMyBookings = () => {
    return useQuery<MyBookings>(["get-my-bookings"], async () => {
        try {
            const { data } = await axiosClient.get<MyBookings>(
                `/task/entity/service-booking/?is_requested=false`
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
