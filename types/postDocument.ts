export interface PostDocumentValueProps {
    file: string;
}

export interface PostDocumentResult {
    status: string;
    message: string;
    id: number;
    created_at: string;
    updated_at: string;
    file: string;
}
