export interface ServiceNearYouCardProps {
    image: string;
    serviceTitle: string;
    serviceProvider: string;
    serviceProviderLocation: string;
    serviceRating: string;
    servicePrice: number;
    haveDiscount: boolean;
    discount?: number;
    discountOn?: string;
}

export interface ServiceNearYouProviderCardProps {
    image: string;
    name: string;
    speciality: string;
    price: number;
}
export interface ServiceNearYou {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    budget: number;
    status: string;
    description: string;
    highlights: string;
    location: string;
    happy_clients: any;
    success_rate: any;
    is_professional: boolean;
    is_online: boolean;
    image: any;
    video: any;
    created_by: string;
    category: number;
    views: Array<any>;
    discount?: number;
}
