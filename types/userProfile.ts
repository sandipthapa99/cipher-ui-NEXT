// export interface UserProfileInfoProps {
//     userImage?: string;
//     userId?: string;
//     countryCode?: number | undefined | string;

//     userName?: string | undefined;

//     userJob?: string | undefined;

//     userRating?: number;

//     userPrice?: number | undefined;

//     userLocation?: string | undefined;

//     userPhone?: string | undefined;

//     userEmail?: string | undefined;

//     moreServices?: string | undefined;

//     activeFrom?: string | undefined;

//     activeTo?: string | undefined;

//     userBio?: string | undefined;

//     userBadge?: string | undefined;

//     userPoints?: number | undefined;

//     pointGoal?: number | undefined;

//     happyClients?: number | undefined;

//     successRate?: number | undefined;

//     userReviews?: number | undefined;

//     taskCompleted?: number | undefined;

//     userActiveStatus?: boolean | undefined;
//     isProfileVerified?: boolean | undefined;
//     tooltipMessage?: string | undefined;
//     field??: (name?: string, file?: any) => void;
// }

export interface UserProfileInfoProps {
    id?: number;
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
    stats: {
        success_rate: number;
        happy_clients: number;
        task_completed: number;
        user_reviews: number;
        task_assigned: number;
        task_in_progress: number;
        task_cancelled: number;
    };
    country: {
        name: string;
        id: number;
    };
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
    userBadge: string;
    userPoints: number;
    pointGoal: number;
    charge_currency: string;
    userActiveStatus: boolean;
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
