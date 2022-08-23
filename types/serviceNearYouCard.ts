export interface ServiceNearYouCardProps {
    image?: string;
    serviceTitle?: string;
    serviceProvider?: string;
    serviceProviderLocation?: string;
    serviceRating?: string | number;
    servicePrice?: number;
    haveDiscount?: boolean;
    discount?: number;
    serviceDescription?: string;
    discountOn?: string;
    highlights?: string[];
    serviceId?: number;
    onServiceClick?: (service: any) => void;
    slug?: string;
}
export interface BookNowDetails extends ServiceNearYouCardProps {
    problemDescription?: string;
    startdate?: string;
    endDate?: string;
    estimatedHours?: number;
}
