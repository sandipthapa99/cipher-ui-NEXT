import { DUMMY_TASKS } from "types/tasks";
import { randNumber } from "utils/randNumber";

export const taskDetails = Array.from({ length: DUMMY_TASKS.length })
    .map((_, index) => index)
    .map((index) => ({
        id: index,
        title: `Task Detail ${index}`,
        user: {
            username: "Its Morbin Time",
            profileImage: "https://thispersondoesnotexist.com/image",
            isOnline: Math.random() > 0.5,
            isVerified: index % 3 === 0,
            happyCustomers: randNumber(500),
            taskCompleted: randNumber(100),
            rewardPercentage: "95%",
            rank: "Bronze",
            location: "Anamnagar, Baneshwor Kathamndu Nepal",
            activeHours: "8:00 AM - 5:00 PM",
            memberSince: "June 9, 2022",
            bio: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
            offeredServices: [
                "Garden Cleaning",
                "Garden Mowing",
                "Garden Mowing",
            ],
        },
        category: "Organization | Garden Services",
        totalRatings: Math.floor(Math.random() * 6) + 1,
        charge: "$35/hr",
    }));

export type TaskDetail = typeof taskDetails[0];

export type TaskerDetails = {
    id: number;
    charge_currency: {
        id: string;
        name: string;
        code: string;
    };
    user: {
        id: string;
        email: string;
        full_name: string;
    };
    portfolio: Array<any>;
    stats: {
        success_rate: number;
        happy_clients: number;
        task_completed: number;

        task_assigned: number;
        task_in_progress: number;
        task_cancelled: number;
    };
    rating?: Rating | any;
    status: string;
    bio: string;
    full_name: string;
    phone: string;
    gender: string;
    profile_image: string;
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
    address_line2: any;
    is_profile_verified: boolean;
    country: any;
    language: any;
    subscription: Array<any>;
};

export interface Rating {
    user_rating_count: number;
    avg_rating: number;
}
