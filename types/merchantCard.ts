export interface MerchantCardProps {
    merchantImage: string;
    merchantName: string;
    currency?: string;
    merchantCategory: string;
    merchantLocation: string;
    merchantDescription: string;
    merchantRating: number | string;
    merchantPrice: string | number;
    happyClients: number;
    successRate: number;
    liked?: boolean;
    merchantId: string | number;
    onClick?: () => void;
}
