export interface ServiceProviderCardProps {
    name: string;
    speciality: string;
    address: string;
    views: number;
    happyClients: number;
    successRate: number;
    startingPrice: number | string;
    image: string;
    isApplied?: boolean;
    isPermission?: boolean;
    isAddServiceForm?: boolean;
}
