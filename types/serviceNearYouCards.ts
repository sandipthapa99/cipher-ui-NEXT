export interface ServiceNearYouCardProps {
    image: string;
    serviceTitle: string;
    serviceProvider: string;
    serviceProviderLocation: string;
    serviceRating: string;
    servicePrice: number;
    haveDiscount: boolean;
    discount?: number;
    discountOn?: string;
}

export interface ServiceNearYouProviderCardProps {
    image: string;
    name: string;
    speciality: string;
    price: number;
}
