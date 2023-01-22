export interface ServiceApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: IService[];
}

export interface IService {
    id: string;
    currency: Currency;
    city: City;
    created_by: CreatedBy;
    service: Service;
    images: Image[];
    videos: any[];
    rating: Rating[];
    count: number[];
    created_at: string;
    updated_at: string;
    deleted_at: any;
    title: string;
    description: string;
    highlights: any;
    budget_type: string;
    budget_from?: number;
    budget_to: number;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    share_location: boolean;
    is_negotiable: boolean;
    revisions: number;
    recursion_type?: string;
    views_count: number;
    location: string;
    is_professional: boolean;
    is_online: boolean;
    is_requested: boolean;
    discount_type?: string;
    discount_value: any;
    extra_data: any;
    no_of_reservation: number;
    slug: string;
    is_active: boolean;
    merchant: any;
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

export interface CreatedBy {
    id: string;
    username: string;
    email: string;
    phone: any;
    first_name: string;
    middle_name: string;
    last_name: string;
    profile_image: string;
    bio: string;
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

export interface Image {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface Rating {
    rating: number;
}
