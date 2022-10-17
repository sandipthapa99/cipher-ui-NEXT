export interface INearbyServicesApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: string;
    previous: null;
    page_size: number;
    result: INearbyService[];
}

export interface INearbyService {
    id: string;
    currency: Currency;
    city: City;
    created_by: CreatedBy;
    service: Service;
    images: Image[];
    videos: any[];
    rating: Rating[] | null;
    count: number[];
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    title: string;
    description: string;
    highlights: string[];
    budget_type: string;
    budget_from: number | null;
    budget_to: number;
    start_date: Date | null;
    end_date: Date | null;
    start_time: null | string;
    end_time: null | string;
    share_location: boolean;
    is_negotiable: boolean;
    revisions: number;
    recursion_type: null;
    views_count: number;
    location: Location;
    is_professional: boolean;
    is_online: boolean;
    is_requested: boolean;
    discount_type: null;
    discount_value: null;
    extra_data: any[];
    no_of_reservation: number;
    slug: string;
    is_active: boolean;
    merchant: null;
}

export interface City {
    id: number;
    name: CityName;
    latitude: number;
    longitude: number;
    country: Country;
}

export interface Country {
    id: number;
    name: CountryName;
}

export enum CountryName {
    Nepal = "Nepal",
}

export enum CityName {
    Butwal = "Butwal",
    Kathmandu = "Kathmandu",
}

export interface CreatedBy {
    id: string;
    username: string;
    email: string;
    phone: null;
    first_name: string;
    middle_name: string;
    last_name: string;
    profile_image: string;
    bio: string;
}

export interface Currency {
    id: number;
    name: CurrencyName;
    code: Code;
    symbol: symbol;
}

export enum Code {
    Npr = "NPR",
}

export enum CurrencyName {
    NepaleseRupee = "Nepalese Rupee",
}

export enum Symbol {
    रू = "रू",
}

export interface Image {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export enum Location {
    KathmanduMallSundharaMargKathmanduNepal = "Kathmandu Mall, Sundhara Marg, Kathmandu, Nepal",
    KathmanduPlazaKamaladiRoadKathmanduNepal = "Kathmandu Plaza, Kamaladi Road, Kathmandu, Nepal",
    Remote = "remote",
}

export interface Rating {
    rating: number;
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
