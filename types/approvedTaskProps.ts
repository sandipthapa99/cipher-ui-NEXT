export type ApprovedTaskProps = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: string;
        assigner: {
            id: string;
            username: string;
            email: string;
            phone: any;
            first_name: string;
            middle_name: string;
            last_name: string;
            profile_image: string;
            bio: string;
            created_at: string;
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
            created_at: string;
        };
        entity_service: {
            id: string;
            budget_type: string;
            budget_from?: number;
            budget_to: number;
            images: Array<{
                id: number;
                name: string;
                size: string;
                media_type: string;
                media: string;
            }>;
            videos: Array<any>;
        };
        currency: {
            id: number;
            name: string;
            code: string;
            symbol: string;
        };
        created_at: string;
        updated_at: string;
        is_active: boolean;
        status: string;
        title: string;
        description: string;
        requirements: string;
        charge: number;
        location: string;
        estimated_time: number;
        slug: string;
        start_date: string;
        is_paid: boolean;
        end_date: string;
        completed_on: string;
        start_time: string;
        end_time: string;
        extra_data: any;
        booking: number;
        city: number;
        images: Array<any>;
        videos: Array<any>;
    }>;
};
