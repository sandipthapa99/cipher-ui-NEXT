export interface CareerValueProps {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: {
        id: number;
        title: string;
        slug: string;
        no_of_opening: number;
        location: string;
        country: string;
    }[];
}
