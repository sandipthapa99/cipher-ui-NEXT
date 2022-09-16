export type BookMarkApiResponse = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        user: string;
        type: string;
        data: Data;
        created_at: string;
        updated_at: string;
        object_id: string;
        content_type: number;
    }>;
};
export type Bookmark = BookMarkApiResponse["result"][0];

export interface Root {
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
    user: string;
    type: string;
    data: Data;
    created_at: string;
    updated_at: string;
    object_id: string;
    content_type: number;
}

export interface Data {
    id: any;
    created_by?: CreatedBy;
    category?: Category;
    currency?: Currency;
    city?: City;
    images?: Image[];
    videos?: Video[];
    created_at?: string;
    updated_at?: string;
    status?: string;
    is_active?: boolean;
    title?: string;
    description?: string;
    highlights?: string;
    budget_type?: string;
    budget_from?: number;
    budget_to: any;
    views_count?: number;
    location?: string;
    is_professional?: boolean;
    is_online?: boolean;
    no_of_revisions?: number;
    discount_type?: string;
    discount_value: any;
    slug?: string;
    meta_title?: string;
    meta_description?: string;
    meta_keyword?: string;
    assigner?: Assigner;
    assignee?: Assignee;
    deleted_at: any;
    requirements?: string;
    charge: any;
    estimated_time: any;
    is_onsite?: boolean;
    start_date: any;
    end_date: any;
    start_time: any;
    end_time: any;
    revisions: any;
    no_of_recursion: any;
    extra_data: any;
    is_negotiable?: boolean;
    recursion_type: any;
    service: any;
    draft_of: any;
    parent_of: any;
    charge_currency?: ChargeCurrency;
    user?: User;
    portfolio?: any[];
    experience?: any[];
    education?: any[];
    certificates?: any[];
    stats?: Stats;
    rating?: Rating;
    country?: string;
    language?: string;
    bio?: string;
    full_name?: string;
    phone?: string;
    gender?: string;
    profile_image?: string;
    date_of_birth?: string;
    skill?: string;
    active_hour_start?: string;
    active_hour_end?: string;
    experience_level?: string;
    user_type?: string;
    hourly_rate?: number;
    profile_visibility?: string;
    task_preferences?: string;
    address_line1?: string;
    address_line2?: string;
    is_profile_verified?: boolean;
    designation: any;
    points?: number;
    subscription?: any[];
    security_questions?: any[];
}

export interface CreatedBy {
    id: string;
    username: string;
    email: string;
    phone: any;
    full_name: string;
    profile_image: any;
}

export interface Category {
    id?: number;
    name: string;
    slug: string;
    icon: string;
}

export interface Currency {
    id?: number;
    name: string;
    code: string;
    symbol?: string;
}

export interface City {
    name: string;
    latitude: any;
    longitude: any;
    country: Country;
}

export interface Country {
    name: string;
}

export interface Image {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface Video {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface Assigner {
    id: any;
    username: string;
    email: string;
    phone: string;
}

export interface Assignee {
    id: any;
    username: string;
    email: string;
    phone: string;
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
