export type MyBookingServiceProps = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        created_by: {
            id: number;
            charge_currency: {
                id: number;
                name: string;
                code: string;
                symbol?: string;
            };
            user: {
                id: string;
                username: string;
                email: string;
                phone: any;
                first_name: string;
                middle_name?: string;
                last_name: string;
                profile_image: any;
                bio: string;
            };
            portfolio: Array<any>;
            experience: Array<any>;
            education: Array<any>;
            certificates: Array<any>;
            stats: {
                success_rate: number;
                happy_clients: number;
                task_completed: number;
                user_reviews: number;
                task_assigned: number;
                task_in_progress: number;
                task_cancelled: number;
            };
            rating: {
                user_rating_count: number;
                avg_rating?: number;
            };
            country: string;
            language: string;
            city: any;
            status: string;
            bio: string;
            gender: string;
            profile_image: string;
            date_of_birth: string;
            skill: string;
            active_hour_start: string;
            active_hour_end: string;
            experience_level: string;
            user_type: string;
            hourly_rate: number;
            profile_visibility: string;
            task_preferences: string;
            address_line1: string;
            address_line2: string;
            is_profile_verified: boolean;
            designation: any;
            points: number;
            subscription: Array<any>;
            security_questions: Array<number>;
        };
        entity_service: {
            id: string;
            created_by: {
                id: string;
                username: string;
                email: string;
                phone: any;
                first_name: string;
                middle_name: string;
                last_name: string;
                profile_image: string;
                bio: string;
            };
            currency: {
                id: number;
                name: string;
                code: string;
                symbol: string;
            };
            city?: {
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
            }>;
            videos: Array<any>;
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
            created_at: string;
            updated_at: string;
            title: string;
            description: string;
            highlights: any;
            budget_type: string;
            budget_from: any;
            budget_to: number;
            start_date: string;
            end_date: string;
            start_time: string;
            end_time: string;
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
            extra_data: any;
            no_of_reservation: number;
            slug: string;
            is_active: boolean;
            merchant: any;
        };
        images: Array<any>;
        videos: Array<any>;
        created_at: string;
        updated_at: string;
        budget_from: any;
        budget_to: number;
        start_date?: string;
        end_date: string;
        start_time?: string;
        end_time?: string;
        location: string;
        is_active: boolean;
        status: string;
        extra_data: {
            key?: string;
            additionalProp1?: string;
            additionalProp2?: string;
            additionalProp3?: string;
        };
        is_accepted: boolean;
        city: number;
    }>;
};

export type BookingDetailProps = {
    id: number;
    created_by: {
        id: number;
        charge_currency: {
            id: number;
            name: string;
            code: string;
            symbol: string;
        };
        user: {
            id: string;
            username: string;
            email: string;
            phone: any;
            first_name: string;
            middle_name: string;
            last_name: string;
        };
        portfolio: Array<any>;
        experience: Array<any>;
        education: Array<any>;
        certificates: Array<any>;
        stats: {
            success_rate: number;
            happy_clients: number;
            task_completed: number;
            user_reviews: number;
            task_assigned: number;
            task_in_progress: number;
            task_cancelled: number;
        };
        rating: {
            user_rating_count: number;
            avg_rating: any;
        };
        country: {
            id: number;
            name: string;
        };
        language: {
            id: number;
            name: string;
        };
        city: any;
        status: string;
        bio: string;
        gender: string;
        profile_image: string;
        date_of_birth: string;
        skill: string;
        active_hour_start: string;
        active_hour_end: string;
        experience_level: string;
        user_type: string;
        hourly_rate: number;
        profile_visibility: string;
        task_preferences: string;
        address_line1: string;
        address_line2: string;
        is_profile_verified: boolean;
        designation: any;
        points: number;
        subscription: Array<any>;
        security_questions: Array<any>;
    };
    entity_service: {
        id: string;
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
        images: Array<{
            id: number;
            name: string;
            size: string;
            media_type: string;
            media: string;
        }>;
        videos: Array<any>;
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
        created_at: string;
        updated_at: string;
        title: string;
        description: string;
        highlights: string[];
        budget_type: string;
        budget_from: number;
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
        merchant: number;
    };
    images: Array<{
        id: number;
        name: string;
        size: string;
        media_type: string;
        media: string;
    }>;
    videos: Array<any>;
    created_at: string;
    updated_at: string;
    budget_from: number;
    budget_to: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: any;
    location: string;
    is_active: boolean;
    status: string;
    extra_data: string;
    description: string;
    requirements: string[];
    is_accepted: boolean;
    city: number;
};
