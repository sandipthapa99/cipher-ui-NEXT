export type BookMarkApiResponse = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        user: string;
        type: string;
        data: {
            id?: string;
            created_by?: {
                id: string;
                username: string;
                email: string;
                phone: any;
                full_name: string;
                profile_image: any;
            };
            category: {
                id?: number;
                name: string;
                slug: string;
                icon?: string;
            };
            currency: {
                id?: number;
                name: string;
                code: string;
            };
            city: {
                id?: number;
                name: string;
                latitude?: number;
                longitude?: number;
                country: {
                    id?: number;
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
            created_at?: string;
            updated_at?: string;
            status?: string;
            is_active: boolean;
            title: string;
            description: string;
            highlights?: string;
            budget_type?: string;
            budget_from?: number;
            budget_to?: number;
            views_count?: number;
            location: string;
            is_professional?: boolean;
            is_online?: boolean;
            no_of_revisions?: number;
            discount_type?: string;
            discount_value: any;
            slug: string;
            meta_title?: string;
            meta_description?: string;
            meta_keyword?: string;
            assigner?: {
                id?: string;
                username: string;
                email: string;
                phone?: string;
                full_name?: string;
                profile_image: any;
            };
            no_of_applicants?: number;
            assignee?: {
                id: any;
                username: string;
                email: string;
                phone: string;
            };
            deleted_at: any;
            requirements?: string;
            charge: any;
            estimated_time?: number;
            is_onsite?: boolean;
            start_date?: string;
            end_date?: string;
            start_time?: string;
            end_time?: string;
            revisions?: number;
            no_of_recursion?: number;
            extra_data?: Array<any>;
            is_negotiable?: boolean;
            recursion_type: any;
            service: any;
            draft_of: any;
            parent_of: any;
        };
        created_at: string;
        updated_at: string;
        object_id: string;
        content_type: number;
    }>;
};
export type Bookmark = BookMarkApiResponse["result"][0];
