export interface TaskerApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: ITasker[];
}

export interface ITasker {
    id: number;
    charge_currency: ChargeCurrency;
    user: User;
    portfolio: Portfolio[];
    experience: Experience[];
    education: Education[];
    certificates: Certificate[];
    stats: Stats;
    rating: Rating;
    country: {
        id: number;
        name: string;
    };
    language: string;
    city: City;
    status: string;
    bio: string;
    gender: string;
    profile_image: string;
    avatar: { image: string };
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
    designation?: string;
    points: number;
    subscription: any[];
    security_questions: any[];
}

export interface ChargeCurrency {
    id: number;
    name: string;
    code: string;
    symbol: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    phone: any;
    first_name: string;
    middle_name: string;
    last_name: string;
    created_at: string;
}

export interface Portfolio {
    id: number;
    images: Image[];
    files: any[];
    title: string;
    description: string;
    issued_date: string;
    credential_url: string;
}

export interface Image {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface Experience {
    id: number;
    title: string;
    description: string;
    employment_type: string;
    company_name: string;
    location: string;
    currently_working: boolean;
    start_date: string;
    end_date: any;
}

export interface Education {
    id: number;
    school: string;
    description: string;
    degree: string;
    field_of_study: string;
    location: string;
    start_date: string;
    end_date: string;
}

export interface Certificate {
    id: number;
    name: string;
    issuing_organization: string;
    description: string;
    does_expire: boolean;
    credential_id: string;
    certificate_url: string;
    issued_date: string;
    expire_date: string;
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

export interface City {
    id: number;
    name: string;
    local_name: string;
    zip_code: string;
    latitude: number;
    longitude: number;
    country: number;
}
