import type { ServicesPackageProps } from "./serviceCard";

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
    budget_from?: string | number;
    budget_to?: string | number;
    budget_type?: string;
    haveDiscount?: boolean;
    servicePrice?: string | number;
    discount?: number;
    serviceDescription?: string;
    discountOn?: string;
    highlights?: Array<{ id: number; name: string }>;
    serviceId?: string;
    serviceSlug?: string;
    onServiceClick?: (service: any) => void;
    slug?: string;
    servicePackage?: ServicesPackageProps["result"];
    serviceCreated?: string;
    serviceViews?: number;
}
export interface BookNowDetails extends ServiceNearYouCardProps {
    problemDescription?: string;
    startdate?: string;
    endDate?: string;
    estimatedHours?: number;
}
