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
    result: {
        id: string;
        currency: {
            id: number;
            name: string;
            code: string;
            symbol: any;
        };
        city: any;
        created_by: {
            id: string;
            username: string;
            email: string;
            phone: any;
            first_name: string;
            middle_name: string;
            last_name: string;
            profile_image: string;
        };
        service: {
            id: string;
            title: string;
            is_active: boolean;
            is_verified: boolean;
            category: {
                id: number;
                name: string;
                level: number;
                slug: string;
            };
            symbol: string;
        };
        created_at: string;
        updated_at: string;
        deleted_at: any;
        title: string;
        description: string;
        highlights: string;
        budget_type: string;
        budget_from: number;
        budget_to: any;
        start_date: any;
        end_date: any;
        start_time: any;
        end_time: any;
        share_location: boolean;
        is_negotiable: boolean;
        revisions: number;
        recursion_type: string;
        views_count: number;
        location: string;
        is_professional: boolean;
        is_online: boolean;
        is_active: boolean;
        is_requested: boolean;
        discount_type: string;
        discount_value: any;
        slug: string;
        extra_data: {
            additionalProp1: string;
            additionalProp2: string;
            additionalProp3: string;
        };
        no_of_reservation: number;
        merchant: any;
        views: any[];
        images: any[];
        videos: any[];
        rating: {
            rating: number;
        }[];
    }[];
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
