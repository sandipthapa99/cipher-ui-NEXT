export interface MyBookings {
    count: number;
    next: string;
    previous: string;
    result: Result[];
}

export interface Result {
    id: number;
    created_by: string;
    entity_service: EntityService;
    images: Image2[];
    videos: Video2[];
    created_at: string;
    updated_at: string;
    budget_from: number;
    budget_to: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    location: string;
    is_active: boolean;
    status: string;
    extra_data: ExtraData2;
    is_accepted: boolean;
    city: number;
}

export interface EntityService {
    id: string;
    created_by: CreatedBy;
    currency: Currency;
    city: City;
    images: Image[];
    videos: Video[];
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
    recursion_type: string;
    views_count: number;
    location: string;
    is_professional: boolean;
    is_online: boolean;
    is_requested: boolean;
    discount_type: string;
    discount_value: number;
    extra_data: ExtraData;
    no_of_reservation: number;
    slug: string;
    merchant: number;
}

export interface CreatedBy {
    id: string;
    username: string;
    email: string;
    phone: string;
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

export interface Video {
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
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

export interface ExtraData {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

export interface Image2 {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface Video2 {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface ExtraData2 {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}
