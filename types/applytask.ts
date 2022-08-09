export interface AllTasks {
    count: number;
    next: any;
    previous: any;
    results: AllTaskResult[];
}

export interface AllTaskResult {
    uuid: string;
    category: string;
    location: string;
    assigner: string;
    currency: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    title: string;
    description: string;
    charge: any;
    requirements: string;
    status: string;
    no_of_revisions: string;
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
    meta_title: string;
    meta_description: string;
    meta_keyword: string;
    task_draft: any;
}
