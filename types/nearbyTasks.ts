export interface INearbyTaskApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: string;
    previous: null;
    page_size: number;
    result: INearbyTask[];
}

export interface INearbyTask {
    id: string;
    title: string;
    entity_service: EntityService;
    assigner: Assignee;
    assignee: Assignee;
    currency: Currency;
    images: any[];
    videos: any[];
    start_date: Date;
    end_date: Date;
    start_time: string;
    end_time: null | string;
}

export interface Assignee {
    id: string;
    username: string;
    email: string;
    phone: null;
    first_name: string;
    middle_name: MiddleName;
    last_name: string;
    profile_image: null | string;
    bio: string;
}

export enum MiddleName {
    Empty = "",
    User = "user",
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

export interface EntityService {
    id: string;
    currency: Currency;
    city: City;
    created_by: Assignee;
    service: Service;
    images: Image[];
    videos: Image[];
    rating: Rating[] | null;
    count: number[];
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    title: string;
    description: string;
    highlights: string[];
    budget_type: BudgetType;
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
    location: string;
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

export enum BudgetType {
    Project = "Project",
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
    Kathmandu = "Kathmandu",
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
