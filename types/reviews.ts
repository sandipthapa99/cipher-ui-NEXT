export interface ReviewsProps {
    name: string;
    ratings: number;
    description: string;
    time: any;
    image?: string;
    raterEmail?: string;
    raterId?: string;
    id?: number;
    replied?: boolean;
    repliedText?: string;
    repliedBy?: string;
    repliedDate?: string;
}
