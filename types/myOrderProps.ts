export type MyOrderProps = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: string;
        user: string;
        currency: number;
        status: string;
        is_active: boolean;
        order_item: Array<{
            id: string;
            item: {
                id: string;
                title: string;
                entity_service: {
                    id: string;
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
                    created_by: {
                        id: string;
                        username: string;
                        email: string;
                        phone: any;
                        first_name: string;
                        middle_name: string;
                        last_name: string;
                        profile_image: any;
                        bio: string;
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
                    };
                    images: Array<{
                        id: number;
                        name: string;
                        size: string;
                        media_type: string;
                        media: string;
                    }>;
                    videos: Array<any>;
                    rating: Array<{
                        rating: number;
                    }>;
                    count: Array<number>;
                    created_at: string;
                    updated_at: string;
                    deleted_at: any;
                    title: string;
                    description: string;
                    highlights: Array<string>;
                    budget_type: string;
                    budget_from: any;
                    budget_to: number;
                    start_date: any;
                    end_date: any;
                    start_time: any;
                    end_time: any;
                    share_location: boolean;
                    is_negotiable: boolean;
                    revisions: number;
                    recursion_type: any;
                    views_count: number;
                    location: string;
                    is_professional: boolean;
                    is_online: boolean;
                    is_requested: boolean;
                    discount_type: any;
                    discount_value: any;
                    extra_data: Array<any>;
                    no_of_reservation: number;
                    slug: string;
                    is_active: boolean;
                    needs_approval: boolean;
                    merchant: number;
                };
                assigner: {
                    id: string;
                    username: string;
                    email: string;
                    phone: any;
                    first_name: string;
                    middle_name: string;
                    last_name: string;
                    profile_image: any;
                    bio: string;
                };
                assignee: {
                    id: string;
                    username: string;
                    email: string;
                    phone: any;
                    first_name: string;
                    middle_name: string;
                    last_name: string;
                    profile_image: any;
                    bio: string;
                };
                currency: {
                    id: number;
                    name: string;
                    code: string;
                    symbol: string;
                };
                images: Array<any>;
                videos: Array<any>;
                start_date: string;
                end_date: string;
                start_time: string;
                end_time: any;
            };
            created_at: string;
            updated_at: string;
            object_id: string;
            amount: number;
            tax: number;
            vat: number;
            offer: number;
            discount: number;
            platform_charge: number;
            platform_charge_discount: number;
            equipment_charges: number;
            revision_charges: number;
            other_charges: number;
            other_discounts: number;
            extra_data: Array<any>;
            is_active: boolean;
            content_type: number;
            order: string;
        }>;
    }>;
};
