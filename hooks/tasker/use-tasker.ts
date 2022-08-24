import { useQuery } from "@tanstack/react-query";
import { StringOptions } from "sass";
import { axiosClient } from "utils/axiosClient";

export const useTaskers = () => {
    return useQuery<Tasker[], Error>(["taskers"], async () => {
        try {
            const { data } = await axiosClient.get<{ result: Tasker[] }>(
                "/tasker/"
            );
            return data.result;
        } catch (error: any) {
            throw new Error(
                error?.response?.data?.message ?? "Failed to fetch taskers"
            );
        }
    });
};

export type Tasker = {
    id: number;
    charge_currency: string;
    user: User;
    portfolio: any[];
    stats: Stats;
    designation: string;
    status: string;
    bio: string;
    full_name: string;
    phone: string;
    gender: string;
    profile_image: any;
    date_of_birth: string;
    skill: string;
    active_hour_start: string;
    active_hour_end: string;
    experience_level: string;
    user_type: string;
    hourly_rate: number;
    profile_visibility: string;
    task_preferences: string;
    address_line1: string;
    address_line2: any;
    is_profile_verified: boolean;
    country: any;
    language: any;
    subscription: any[];
};

export interface User {
    id: string;
    email: string;
    full_name: string;
    profile_image: string;
}

export interface Stats {
    success_rate: number;
    happy_clients: number;
    task_completed: number;
    user_reviews: number;
    task_assigned: number;
    task_in_progress: number;
    task_cancelled: number;
}
