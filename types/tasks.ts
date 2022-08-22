const USERS = [
    "Dr Michael Morbius",
    "Milo Morbius",
    "Walter White",
    "Jesse Pinkman",
    "Despacito Lover",
    "Better Call Saul",
];
export const DUMMY_TASKS = Array.from({ length: USERS.length })
    .map((_, index) => index)
    .map((index) => ({
        id: index,
        user: {
            profileImage: "https://thispersondoesnotexist.com/image",
            username: USERS[index],
            category: "Influencer",
            location: "Ganeshpur, NPJ",
            bio: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.`,
        },
        likes: 200,
        rewardPercentage: "95%",
        price: "Rs 1801",
        rating: {
            average: 4.5,
            totalRatings: 400,
        },
    }));

export type Task = typeof DUMMY_TASKS[0];

export interface Tasker {
    id: number;
    charge_currency: string;
    user: User;
    portfolio: any[];
    stats: Stats;
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
}

export interface User {
    id: string;
    email: string;
    full_name: string;
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
