export interface MerchantCardProps {
    merchantImage: string;
    merchantName: string;
    merchantCategory: string;
    merchantLocation: string;
    merchantDescription: string;
    merchantRating: number;
    merchantPrice: string;
    happyClients: number;
    successRate: number;
    liked?: boolean;
    onClick?: () => void;
}
