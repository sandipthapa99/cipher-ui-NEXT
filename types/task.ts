export interface ITaskApiResponse {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: ITask[];
}

export interface Media {
    id: number;
    size: number;
    name: string;
    media: string;
    media_type: "image" | "video" | "pdf";
    placeholder: string;
}
export interface ITask {
    id: string;
    title: string;
    category: {
        id: number;
        name: string;
        slug: string;
        icon: string | null;
    };
    location: string;
    assigner: {
        id: string;
        email: string;
        full_name: string;
        profile_image: string;
    };
    is_negotiable: boolean;
    currency: { id: number; code: string; name: number };
    created_at: string;
    updated_at: string;
    deleted_at: any;
    description: string;
    charge?: number;
    requirements: string;
    status: string;
    no_of_revisions: any;
    start_date: string;
    no_of_applicants: number;
    start_time: string;
    end_date: string;
    end_time: string;
    estimated_time: number;
    budget_type: string;
    budget_from: number;
    budget_to: number;
    no_of_revision_done: any;
    image: any;
    video: any;
    is_onsite: boolean;
    slug: string;
    is_recursion: boolean;
    is_everyday: boolean;
    no_of_recursion: number;
    meta_title: any;
    meta_description?: string;
    meta_keyword: any;
    task_draft: any;
    date: string;
    time: string;
    applicants_count: number;
    images: Media[];
    videos: Media[];
}
export interface TaskApplicantsProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
        task: string;
        user: {
            id: number;
            charge_currency: {
                id: number;
                name: string;
                code: string;
                symbol: any;
            };
            user: {
                id: string;
                username: string;
                email: string;
                phone: any;
                full_name: string;
                profile_image: any;
            };
            portfolio: any[];
            experience: any[];
            education: any[];
            certificates: any[];
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
        };
        created_at: string;
        updated_at: string;
        deleted_at: any;
        status: string;
        is_active: boolean;
        remarks: string;
        charge: number;
        pre_requisites: string;
        contract: any;
    }[];
}
