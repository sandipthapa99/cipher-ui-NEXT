import type { ServicesPackageProps, ServicesValueProps } from "./serviceCard";

export interface ServiceNearYouCardProps {
    image?:
        | string
        | {
              id: number;
              name: string;
              size: number;
              media: string;
              media_type: string;
              placeholder: string;
          }[];
    serviceTitle?: string;
    currency?: string;
    serviceProvider?: string;
    serviceProviderLocation?: string;
    serviceRating?: string | number;
    budget_from?: number;
    budget_to?: number;
    budget_type?: string;
    haveDiscount?: boolean;
    servicePrice?: string | number;
    discount?: number;
    serviceDescription?: string;
    discountOn?: string;
    highlights?: any;
    serviceProviderId?: string;
    serviceId?: string;
    serviceSlug?: string;
    onServiceClick?: (service: any) => void;
    slug?: string;
    servicePackage?: ServicesPackageProps["result"];
    serviceCreated?: string;
    serviceViews?: number;
    service?: ServicesValueProps["result"][0];
    ProfileImage?: string;
    ratedTo: string;
    offers: {
        id: number;
        code: string;
        description: string;
        image: string;
        offer_type: string;
        title: string;
    }[];
}

export type ServiceCardType = Omit<ServiceNearYouCardProps, "ratedTo">;
export interface BookNowDetails extends ServiceNearYouCardProps {
    problemDescription?: string;
    startdate?: string;
    endDate?: string;
    estimatedHours?: number;
}
