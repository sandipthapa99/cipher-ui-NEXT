export interface RatingResponse {
    count: number;
    next: string;
    previous: string;
    result: RatingResult[];
}

export interface RatingResult {
    id: number;
    rated_to: RatedTo;
    rated_by: RatedBy;
    created_at: string;
    updated_at: string;
    rating: number;
    review: string;
    task_detail: number;
    reply: string;
    replied_date: string;
}

export interface RatedTo {
    avatar: { image: string };
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

export interface RatedBy {
    avatar: { image: string };
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}
