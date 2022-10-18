export interface MerchantCardProps {
    merchantImage: string | null | undefined;
    merchantName: string | null | undefined;
    currency?: string | null | undefined;
    merchantCategory: string | null | undefined;
    merchantLocation: string | null | undefined;
    merchantDescription: string | null | undefined;
    merchantRating: number | string | null | undefined;
    merchantPrice: string | null | undefined | number;
    happyClients: number | undefined | null;
    successRate: number | undefined | null | string;
    liked?: boolean;
    merchantId: string | null | undefined | number;
    onClick?: () => void;
}
