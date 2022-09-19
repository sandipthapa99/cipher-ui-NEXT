import type { Dispatch, SetStateAction } from "react";
export interface BookNowModalCardProps {
    service_id?: string | undefined;
    title: string | undefined;
    budget_from?: number | string | undefined;
    budget_to?: number | string | undefined;
    description: string | undefined;
    show?: boolean;
    handleClose?: () => void;
    setShow: Dispatch<SetStateAction<boolean>>;
    budget_type?: string;
    price?: number | string;
    image?: string;
    entity_service_id?: number | undefined | string;
    images?: any[];
}

export interface BookNowFormProps {
    description: string;
    images: File | File[] | string;
    // imagePreviewUrl?: any[];
    start_time: number;
    start_date: string;
    end_date: string;
    budget_from: number;
    budget_to: number;
    requirements: string;
    videos: File | File[] | string;
    location: string;
}
