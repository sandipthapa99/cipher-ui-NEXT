export type MyTaskProps = {
    id: string;
    category: {
        id: number;
        name: string;
        slug: string;
        icon: string;
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
    created_by: {
        id: string;
        username: string;
        email: string;
        phone: string;
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
        symbol: any;
    };
    no_of_applicants: number;
    images: Array<{
        id: number;
        name: string;
        size: string;
        media_type: string;
        media: string;
        placeholder: string;
    }>;
    videos: Array<{
        id: number;
        name: string;
        size: string;
        media_type: string;
        media: string;
        placeholder: string;
    }>;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    is_active: boolean;
    status: string;
    title: string;
    description: string;
    requirements: string;
    charge: any;
    location: string;
    estimated_time: number;
    budget_type: string;
    budget_from?: number;
    budget_to: number;
    is_onsite: boolean;
    slug: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    revisions: number;
    no_of_recursion: number;
    extra_data: any;
    is_negotiable: boolean;
    meta_title: any;
    meta_description: any;
    meta_keyword: any;
    recursion_type: any;
    assignee: any;
    service: any;
    draft_of: any;
    parent_of: any;
};

export type MyTaskOrderProps = {
    task_id: string;
    applied_id?: string;
    assigner_id?: string;
    image: string;
    title: string;
    completed_on?: string;
    assigner_name: string;
    budget_from?: number | string | undefined;
    currency: string;
    budget_to: number | string;
    budget_type: string;
    status: string;
    created_at: string | Date;
    taskID: string;
};
