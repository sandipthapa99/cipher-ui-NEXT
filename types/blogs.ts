export interface BlogValueProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
        likes: number;
        views: number;
        created_at: string;
        author: string;
        blog_type: string;
        is_deleted: boolean;
        updated_at: string;
        deleted_at: any;
        status: string;
        title: string;
        slug: string;
        image: string;
        content: string;
        comment: boolean;
        is_active: boolean;
        category: string;
        published_status: string;
        tags: string;
    }[];
}
export interface BlogDetailData {
    status: string;
    is_liked: boolean;
    data: {
        id: number;
        created_at: string;
        likes: number;
        views: number;
        comments: any[];
        author: string;
        is_deleted: boolean;
        updated_at: string;
        deleted_at: any;
        status: string;
        title: string;
        slug: string;
        image: string;
        content: string;
        comment: boolean;
        is_active: boolean;
        category: string;
        published_status: string;
        blog_type: string;
        tags: string;
    };
}
