export type NestedCategoriesDataProps = Array<{
    id: number;
    name: string;
    level: number;
    slug: string;
    icon: string;
    task_count: number;
    child: Array<{
        id: number;
        name: string;
        level: number;
        slug: string;
        icon: string;
        task_count: number;
        child: Array<{
            id: number;
            name: string;
            level: number;
            slug: string;
            icon: string;
            task_count: number;
            child: Array<any>;
        }>;
    }>;
}>;
