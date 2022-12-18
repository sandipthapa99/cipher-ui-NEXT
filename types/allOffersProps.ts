export type AllOffersProps = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        services: Array<{
            id: string;
            title: string;
            views_count: number;
        }>;
        entity_services: Array<{
            id: string;
            slug: string;
            created_at: string;
            created_by: {
                id: string;
                username: string;
                email: string;
                phone?: string;
                first_name: string;
                middle_name: string;
                last_name: string;
                profile_image?: string;
                bio: string;
                created_at: string;
                designation: string;
                user_type: string;
                is_profile_verified: string;
                is_followed: boolean;
                is_following: boolean;
                avatar: {
                    id?: number;
                    image?: string;
                };
            };
            title: string;
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
                    iso_code: string;
                };
            };
            is_online: boolean;
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
            videos: Array<{
                id: number;
                name: string;
                size: string;
                media_type: string;
                media: string;
            }>;
            rating: Array<{
                rating: number;
            }>;
            budget_type: string;
            is_requested: boolean;
            budget_from?: number;
            budget_to: number;
            location: string;
            count: Array<number>;
        }>;
        categories: Array<{
            id: number;
            name: string;
            slug: string;
            icon?: string;
        }>;
        created_by: {
            id: string;
            username: string;
            email: string;
            phone: any;
            first_name?: string;
            middle_name?: string;
            last_name?: string;
            profile_image?: string;
            bio?: string;
            created_at: string;
            designation?: string;
            user_type?: string;
            is_profile_verified?: string;
            is_followed: boolean;
            is_following: boolean;
            avatar?: {
                id: number;
                image: string;
            };
        };
        merchant: any;
        country?: {
            id: number;
            name: string;
            iso_code: string;
        };
        free?: {
            id: string;
            slug: string;
            created_at: string;
            created_by: {
                id: string;
                username: string;
                email: string;
                phone?: string;
                first_name: string;
                middle_name: string;
                last_name: string;
                profile_image?: string;
                bio: string;
                created_at: string;
                designation: string;
                user_type: string;
                is_profile_verified: string;
                is_followed: boolean;
                is_following: boolean;
                avatar: {
                    image: any;
                };
            };
            title: string;
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
                    iso_code: string;
                };
            };
            is_online: boolean;
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
            budget_type: string;
            is_requested: boolean;
            budget_from: any;
            budget_to: number;
            location: string;
            count: Array<number>;
        };
        offer_rule?: {
            id: number;
            is_active: boolean;
            title: string;
            description: string;
            extra_data: {
                key?: string;
            };
            has_discount: boolean;
            has_free_items: boolean;
            has_quantity: boolean;
        };
        created_at: string;
        updated_at: string;
        is_active: boolean;
        title: string;
        description?: string;
        offer_type: string;
        code?: string;
        image: string;
        start_date: string;
        end_date?: string;
        is_consumable: boolean;
        discount?: number;
        discount_type?: string;
        discount_limit?: number;
        quantity: any;
        organizations: Array<any>;
        redeems: Array<string>;
    }>;
};
