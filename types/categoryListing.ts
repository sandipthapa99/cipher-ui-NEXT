export type CategoryListingProps = {
    total_pages: number;
    count: number;
    current: number;
    next: string;
    previous: any;
    page_size: number;
    result: Array<{
        id: number;
        is_active: boolean;
        name: string;
        slug: string;
        icon: string;
        level: number;
        child: Array<{
            id: number;
            name: string;
            level: number;
            is_active: boolean;
            child?: Array<{
                id: number;
                name: string;
                level: number;
                is_active: boolean;
            }>;
        }>;
        task_count: number;
        service_count: number;
    }>;
};
