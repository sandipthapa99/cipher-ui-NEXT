export interface TaskerProps {
    total_pages: number;
    count: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
        charge_currency: {
            id: string;
            name: string;
            code: string;
            symbol: any;
        };
        user: {
            id: string;
            email: string;
            first_name: string;
            middle_name: string;
            last_name: string;
            profile_image: string;
        };
        portfolio: {
            id: number;
            images: {
                id: number;
                name: string;
                size: string;
                media_type: string;
                media: string;
                placeholder: string;
            }[];
            files: {
                id: number;
                name: string;
                size: string;
                media_type: string;
                media: string;
                placeholder: string;
            }[];
            title: string;
            description: string;
            issued_date: string;
            credential_url: string;
        }[];
        experience: {
            id: number;
            title: string;
            description: string;
            employment_type: string;
            company_name: string;
            location: string;
            currently_working: boolean;
            start_date: string;
            end_date: any;
        }[];
        education: {
            id: number;
            school: string;
            description: string;
            degree: string;
            field_of_study: string;
            location: string;
            start_date: string;
            end_date: string;
        }[];
        certificates: {
            id: number;
            name: string;
            issuing_organization: string;
            description: string;
            does_expire: boolean;
            credential_id: string;
            certificate_url: string;
            issued_date: string;
            expire_date: any;
        }[];
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
            avg_rating: number;
        };
        country: string;
        language: string;
        status: string;
        bio: string;
        full_name: string;
        phone: string;
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
        subscription: any[];
        security_questions: any[];
    }[];
}
