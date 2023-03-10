import type { Dispatch, SetStateAction } from "react";
interface Currency {
    code: string;
    id: number;
    name: string;
    symbol: string;
}
export interface BookNowModalCardProps {
    service_id?: string | undefined;
    title: string | undefined;
    tasker_id: string;
    tasker_name?: string;
    offer?: {
        id: number;
        code: string;
        description: string;
        image: string;
        offer_type: string;
        title: string;
    }[];
    budget_from?: number;
    budget_to?: number;
    tasker_img?: string;
    description: string | undefined;
    show?: boolean;
    handleClose?: () => void;
    setShow: Dispatch<SetStateAction<boolean>>;
    budget_type?: string;
    price?: number | string;
    image?: string;
    entity_service_id?: number | undefined | string;
    images?: any[];
    currency?: Currency;
    currencySymbol?: string;
}

export interface BookNowFormProps {
    description: string;
    images: File | File[] | string;
    // imagePreviewUrl?: any[];
    start_time: number;
    start_date: string;
    end_date: string;
    budget_from: number;
    entity_service?: string;
    budget_to: number;
    requirements: string;
    videos: File | File[] | string;
    location: string;
}
