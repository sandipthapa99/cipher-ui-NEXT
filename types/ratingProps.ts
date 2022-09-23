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
}

export interface RatedTo {
    id: string;
    email: string;
    full_name: string;
    profile_image: string;
}

export interface RatedBy {
    id: string;
    email: string;
    full_name: string;
    profile_image: string;
}
