export interface HeroCategoryProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        category: {
            name: string;
            icon: string;
            slug: string;
        };
        is_active: boolean;
    }>;
}
