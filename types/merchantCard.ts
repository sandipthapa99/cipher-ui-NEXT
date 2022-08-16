export interface MerchantCardProps {
    merchantImage: string;
    merchantName: string;
    merchantCategory: string;
    merchantLocation: string;
    merchantDescription: string;
    merchantRating: string;
    merchantPrice: number;
    happyClients: number;
    successRate: number;
    liked?: boolean;
}
