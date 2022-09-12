import { NumberInputProps } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export type ProfileResponse = {
    id: number;
    charge_currency: {
        code: string;
        id: number;
        name: string;
    };
    user: {
        id: string;
        email: string;
        full_name: string;
        profile_image: string;
    };
    portfolio: Array<{
        id: number;
        title: string;
        description: string;
        issued_date: string;
        credential_url: string;
        image: string;
        file: string;
    }>;
    experience: Array<{
        id: number;
        title: string;
        description: string;
        employment_type: string;
        company_name: string;
        location: string;
        currently_working: boolean;
        start_date: string;
        end_date: any;
    }>;
    education: Array<{
        id: number;
        school: string;
        description: string;
        degree: string;
        field_of_study: string;
        location: string;
        start_date: string;
        end_date: string;
    }>;
    certificates: Array<{
        id: number;
        name: string;
        issuing_organization: string;
        description: string;
        does_expire: boolean;
        credential_id: string;
        certificate_url: string;
        issued_date: string;
        expire_date?: string;
    }>;
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
        avg_rating: number;
    };
    country: string | number;
    language: string;
    status: string;
    bio: string;
    full_name: string;
    phone: string;
    gender: string;
    profile_image: string;
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
    points: number;
    address_line2: string;
    is_profile_verified: boolean;
    designation: any;
    subscription: Array<any>;
};

export const useGetProfile = () => {
    const { data: user } = useUser();
    return useQuery<ProfileResponse>(
        ["profile"],
        async () => {
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
        },
        { enabled: !!user }
    );
};
