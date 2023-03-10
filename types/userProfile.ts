export interface UserProfileInfoProps {
    id?: number;
    charge_currency: string;
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
    followers_count?: number;
    following_count?: number;
    stats: {
        success_rate: number;
        happy_clients: number;
        task_completed: number;
        user_reviews: number;
        task_assigned: number;
        task_in_progress: number;
        task_cancelled: number;
    };
    country: string;
    key: number;
    points: number;
    profile_image: string;
    full_name: string;
    user_type: string;
    rating: number;
    hourly_rate: number;
    phone: string;
    address_line1: string;
    address_line2: string;
    skill: string;
    active_hour_start: string;
    active_hour_end: string;
    bio: string;
    badge: {
        id: number;
        image: string;
        title: string;
        progress_level_start: number;
        progress_level_end: number;
        next: {
            id: number;
            image: string;
            title: string;
            progress_level_start: number;
            progress_level_end: number;
        };
    };
    userBadge: string;
    userPoints: number;

    tooltipMessage: string;
    is_profile_verified: boolean;

    //
    field?: (name?: string, file?: any) => void;
}

export interface ChargeCurrency {
    id?: number;
    name?: string;
    code?: string;
}

export interface User {
    id?: string;
    username?: string;
    email?: string;
    draft_email?: string;
    phone?: string;
    draft_phone?: string;
    full_name?: string;
    profile_image?: string;
}

export interface Stats {
    success_rate?: number;
    happy_clients?: number;
    task_completed?: number;
    user_reviews?: number;
    task_assigned?: number;
    task_in_progress?: number;
    task_cancelled?: number;
}
export interface Rating {
    user_rating_count: number;
    avg_rating: number;
}
