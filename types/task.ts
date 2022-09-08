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
    media: string;
    media_type: "image" | "video" | "pdf";
    placeholder: string;
}
export interface ITask {
    id: string;
    title: string;
    category: any;
    location: any;
    assigner: {
        id: string;
        email: string;
        full_name: string;
        profile_image: string;
    };
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
