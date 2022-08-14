export interface BookmarkValueProps {
    object_id: string;
    model: string;
}

export interface BookmarkResult {
    id: number;
    model: string;
    created_at: string;
    updated_at: string;
    object_id: string;
    message: string;
    status: string;
}
