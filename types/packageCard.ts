export interface PacakageCardProps {
    title: string;
    price: string;
    offers?: { id: number; name: string }[];
    isPermium: boolean;
    advantage: string;
    isRecommended: boolean;
    isFromAddService?: boolean;
    discountAmount?: number;
}
export interface MembershipCardProps {
    title: string;
    price: string;
    offers: any;
    isPermium: boolean;
    advantage: string;
    isRecommended: boolean;
    isFromAddService?: boolean;
}
