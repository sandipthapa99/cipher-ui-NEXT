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
            profile_image: string;
        };
        category: {
            id: number;
            name: string;
            slug: string;
            icon: string;
        };
        currency: {
            id: number;
            name: string;
            code: string;
            symbol: string;
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
        images?: {
            id: number;
            name: string;
            size: number;
            media: string;
            media_type: string;
            placeholder: string;
        }[];
        videos: {
            id: number;
            name: string;
            size: string;
            media_type: string;
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
export interface RecentProps {
    result?: Array<{
        id?: string;
        category: {
            id: number;
            name: string;
            slug: string;
            icon: string;
        };
        city: {
            id: number;
            name: string;
            country: {
                id: number;
                name: string;
            };
        };
        assigner: {
            id: string;
            email: string;
            full_name: string;
            profile_image: string;
        };
        currency?: string;
        no_of_applicants: number;
        images: Array<any>;
        videos: Array<any>;
        created_at: string;
        updated_at: string;
        deleted_at: any;
        is_active: boolean;
        status?: string;
        title?: string;
        description?: string;
        requirements: string;
        charge?: any;
        location?: string;
        estimated_time: number;
        budget_type: string;
        budget_from: number;
        budget_to: number;
        is_onsite: boolean;
        slug: string;
        start_date?: string;
        end_date: string;
        start_time?: string;
        end_time: string;
        revisions: number;
        no_of_recursion: number;
        extra_data: any;
        is_negotiable: boolean;
        meta_title: any;
        meta_description: any;
        meta_keyword: any;
        assignee: any;
        service: any;
        draft_of: any;
        parent_of: any;
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
    currency: number;
    city: number;
    images: any[];
    imagePreviewUrl: any[];
}
