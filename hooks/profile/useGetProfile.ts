import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export type ProfileResponse = {
    id: number;
    charge_currency: string;
    user: {
        email: string;
    };
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
    education: string;
    user_type: string;
    hourly_rate: number;
    profile_visibility: string;
    task_preferences: string;
    address_line1: string;
    address_line2: string;
    is_profile_verified: boolean;
    country: number;
    language: number;
    subscription: Array<any>;
};

export const useGetProfile = () => {
    return useQuery<ProfileResponse>(["profile"], async () => {
        try {
            const { data } = await axiosClient.get<ProfileResponse>(
                "/tasker/profile/"
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
