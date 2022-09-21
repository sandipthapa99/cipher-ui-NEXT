export type MyBookingProps = {
    id: number;
    created_by: {
        id: string;
        username: string;
        email: string;
        phone: any;
        full_name: string;
        profile_image: string;
    };
    service: {
        id: string;
        created_by: {
            id: string;
            username: string;
            email: string;
            phone: any;
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
            symbol: any;
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
        images: Array<{
            id: number;
            name: string;
            size: string;
            media_type: string;
            media: string;
            placeholder: string;
        }>;
        videos: Array<any>;
        created_at: string;
        updated_at: string;
        status: string;
        is_active: boolean;
        title: string;
        description: string;
        highlights: string;
        budget_type: string;
        budget_from: number;
        budget_to: any;
        views_count: number;
        location: string;
        is_professional: boolean;
        is_online: boolean;
        no_of_revisions: number;
        discount_type: string;
        discount_value: any;
        slug: string;
        meta_title: any;
        meta_description: any;
        meta_keyword: any;
    };
    created_at: string;
    updated_at: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    status: string;
    extra_data: any;
    images: Array<number>;
    videos: Array<any>;
};
