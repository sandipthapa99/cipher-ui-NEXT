export interface ITaskApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: ITask[];
}

export interface Media {
    id: number;
    size: number;
    name: string;
    media: string;
    media_type: "image" | "video" | "pdf";
    placeholder: string;
}
export interface ITask {
    service: { id: string; title: string };
    id: string;
    title: string;
    category: {
        id: number;
        name: string;
        slug: string;
        icon: string | null;
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
    location: string;
    created_by: {
        id: string;
        email: string;
        first_name: string;
        middle_name: string;
        bio: string;
        last_name: string;
        profile_image: string;
    };
    is_negotiable: boolean;
    currency: { id: number; code: string; name: string; symbol: string };
    created_at: string;
    updated_at: string;
    deleted_at: any;
    description: string;
    charge?: number;
    highlights: Record<string, string>;
    status: string;
    no_of_revisions: any;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    estimated_time: number;
    budget_type: string;
    budget_from: number;
    budget_to: number;
    no_of_revision_done: any;
    image: any;
    video: any;
    is_onsite: boolean;
    slug: string;
    is_recursion: boolean;
    is_everyday: boolean;
    no_of_recursion: number;
    meta_title: any;
    meta_description?: string;
    meta_keyword: any;
    task_draft: any;
    date: string;
    time: string;
    applicants_count: number;
    images: Media[];
    videos: Media[];
}

// export interface TaskApplicantsProps {
//     total_pages: number;
//     count: number;
//     current: number;
//     next: any;
//     previous: any;
//     page_size: number;
//     result: {
//         id: number;
//         task: string;
//         user: {
//             id: number;
//             charge_currency: {
//                 id: number;
//                 name: string;
//                 code: string;
//                 symbol: any;
//             };
//             user: {
//                 id: string;
//                 username: string;
//                 email: string;
//                 phone: any;
//                 full_name: string;
//                 profile_image: any;
//             };
//             portfolio: any[];
//             experience: any[];
//             education: any[];
//             certificates: any[];
//             stats: {
//                 success_rate: number;
//                 happy_clients: number;
//                 task_completed: number;
//                 user_reviews: number;
//                 task_assigned: number;
//                 task_in_progress: number;
//                 task_cancelled: number;
//             };
//             rating: {
//                 user_rating_count: number;
//                 avg_rating: any;
//             };
//             country: string;
//             language: string;
//             status: string;
//             bio: string;
//             full_name: string;
//             phone: string;
//             gender: string;
//             profile_image: string;
//             date_of_birth: string;
//             skill: string;
//             active_hour_start: string;
//             active_hour_end: string;
//             experience_level: string;
//             user_type: string;
//             hourly_rate: number;
//             profile_visibility: string;
//             task_preferences: string;
//             address_line1: string;
//             address_line2: string;
//             is_profile_verified: boolean;
//             designation: any;
//             points: number;
//             subscription: any[];
//             security_questions: any[];
//         };
//         created_at: string;
//         updated_at: string;
//         deleted_at: any;
//         status: string;
//         is_active: boolean;
//         remarks: string;
//         charge: number;
//         pre_requisites: string;
//         contract: any;
//     }[];
// }

export interface TaskApplicantsProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Result[];
}

export interface Result {
    id: number;
    created_by: CreatedBy;
    entity_service: EntityService;
    images: any[];
    videos: any[];
    created_at: string;
    updated_at: string;
    budget_from: any;
    budget_to: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    location: string;
    is_active: boolean;
    status: string;
    // extra_data: ExtraData;
    is_accepted: boolean;
    city: any;
}

export interface CreatedBy {
    id: number;
    charge_currency: ChargeCurrency;
    user: User;
    portfolio: any[];
    experience: any[];
    education: any[];
    certificates: any[];
    stats: Stats;
    rating: Rating;
    country: string;
    language: string;
    city: any;
    status: string;
    bio: string;
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
    address_line2: string;
    is_profile_verified: boolean;
    designation: any;
    points: number;
    subscription: any[];
    security_questions: number[];
}

export interface ChargeCurrency {
    id: number;
    name: string;
    code: string;
    symbol: any;
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone: any;
    full_name: string;
    profile_image: any;
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

export interface Rating {
    user_rating_count: number;
    avg_rating: any;
}

export interface EntityService {
    id: string;
    created_by: CreatedBy2;
    currency: Currency;
    city: City;
    images: Image[];
    videos: any[];
    service: Service;
    created_at: string;
    updated_at: string;
    title: string;
    description: string;
    highlights: Highlights;
    budget_type: string;
    budget_from: number;
    budget_to: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
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
    extra_data: any[];
    no_of_reservation: number;
    slug: string;
    merchant: any;
}

export interface CreatedBy2 {
    id: string;
    username: string;
    email: string;
    phone: any;
    full_name: string;
    profile_image: string;
}

export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
}

export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: Country;
}

export interface Country {
    id: number;
    name: string;
}

export interface Image {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface Service {
    id: string;
    title: string;
    is_active: boolean;
    is_verified: boolean;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    level: number;
    slug: string;
}

export interface Highlights {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
}

// export interface ExtraData {}
