export interface ServiceCardProps {
    serviceImage: string;
    serviceTitle: string;
    serviceProvider: string;
    serviceProviderLocation: string;
    serviceDescription: string;
    serviceRating: string;
    servicePrice: string;
    hasOffer: boolean;
    discountRate?: number;
    discountOn?: string;

}