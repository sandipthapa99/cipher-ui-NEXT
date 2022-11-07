export interface ReviewsProps {
    name: string;
    ratings: number;
    description: string;
    time: any;
    ratedByImage?: string;
    ratedToImage?: string;
    raterEmail?: string;
    raterId?: string;
    id?: number;
    replied?: boolean;
    repliedText?: string;
    repliedBy?: string;
    repliedDate?: string;
    ratedToId?: string;
}
