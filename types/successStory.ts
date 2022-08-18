export interface SuccessStoryProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        full_name: string;
        email: string;
        profile_image: string;
        specialities: string;
        content: string;
    }[];
}
