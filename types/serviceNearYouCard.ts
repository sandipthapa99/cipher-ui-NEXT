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
    serviceProvider?: string;
    serviceProviderLocation?: string;
    serviceRating?: string | number;
    servicePrice?: number;
    haveDiscount?: boolean;
    discount?: number;
    serviceDescription?: string;
    discountOn?: string;
    highlights?: string[];
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
