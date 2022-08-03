export interface ServiceNearYouCardProps {
    image: string;
    serviceTitle: string;
    serviceProvider: string;
    serviceProviderLocation: string;
    serviceRating: string;
    servicePrice: number;
    haveDiscount: boolean;
    discount?: number;
    serviceDescription: string;
    discountOn?: string;
}
