export interface ServiceCardProps {
    serviceImage: string;
    serviceTitle: string;
    serviceProvider: string;
    serviceProviderLocation: string;
    serviceDescription: string;
    serviceRating: string;
    servicePrice: string;
    hasOffer?: boolean;
    discountRate?: number;
    discountOn?: string;
    proService?: boolean;
    isEdit?: boolean;
}

export interface ServicesValueProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: string;
        created_by: {
            id: string;
            email: string;
            full_name: string;
        };
        category: {
            id: number;
            name: string;
            slug: string;
            icon: string;
        };
        city: any;
        images?: {
            id: number;
            name: string;
            size: number;
            image: string;
            media: string;
        }[];
        created_at: string;
        updated_at: string;
        title: string;
        budget_type: string;
        budget_from: number;
        budget_to: number;
        status: string;
        description: string;
        highlights: string;
        views_count: number;
        location: string;
        happy_clients: number;
        success_rate: number;
        is_professional: boolean;
        is_online: boolean;
        video: any;
        no_of_revisions: number;
        discount_type: string;
        discount_value: number;
        is_active: boolean;
        slug: string;
    }>;
}
export interface ServicesPackageProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
        service: ServicesValueProps["result"][0];
        title: string;
        description: string;
        budget: number;
        no_of_revision: number;
        service_offered: string;
        is_active: boolean;
        slug: string;
        budget_type: string;
        discount_type: string;
        discount_value: number;
        is_recommended: boolean;
    }[];
}
export type ServiceCardResult = ServicesValueProps["result"][0];

export interface ServicePostProps {
    title: string;
    budget_type: string;
    budget_from: string;
    budget_to: string;
    description: string;
    highlights: string;
    location: string;
    is_professional: boolean;
    is_online: boolean;
    video: string;
    no_of_revisions: number;
    discount_type: string;
    discount_value: string;
    is_active: boolean;
    category: number;
    city: number;
    images: any[];
    imagePreviewUrl: any[];
}
