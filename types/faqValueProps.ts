export interface FAQValueProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
        topic: string;
        created_at: string;
        updated_at: string;
        deleted_at: any;
        status: string;
        title: string;
        content: string;
    }[];
}

export interface FAQTopicValueProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
        faq_count: number;
        created_at: string;
        updated_at: string;
        deleted_at: any;
        status: string;
        topic: string;
    }[];
}
