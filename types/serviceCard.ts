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
}

export interface ServicesValueProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
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
    }[];
}
export type ServiceCardResult = ServicesValueProps["result"][0];
