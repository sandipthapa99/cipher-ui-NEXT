import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUser } from "hooks/auth/useUser";
import { axiosClient } from "utils/axiosClient";

export type ProfileResponse = {
    id: number;
    charge_currency: {
        symbol: any;
        code: string;
        id: number;
        name: string;
    };
    city: {
        id: number;
        name: string;
        country: number;
    };
    followers_count: number;
    following_count: number;
    user: {
        id: string;
        username: string;
        email: string;
        draft_email: any;
        phone: any;
        draft_phone: any;
        first_name: string;
        middle_name: string;
        last_name: string;
        profile_image: string;
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
    country: {
        id: number;
        name: string;
    };
    language: {
        id: number;
        name: string;
    };
    status: string;
    bio: string;
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
    address_line2: string;
    is_profile_verified: boolean;
    designation: any;
    points: number;
    subscription: Array<any>;
    security_questions: Array<any>;
};

export const useGetProfile = () => {
    const { data: user } = useUser();
    return useQuery<ProfileResponse | undefined>(
        ["profile", user?.id],
        async () => {
            if (!user) return undefined;
            try {
                const { data } = await axiosClient.get<ProfileResponse>(
                    "/tasker/profile/"
                );
                return data;
            } catch (error) {
                return undefined;
            }
        }
    );
};
