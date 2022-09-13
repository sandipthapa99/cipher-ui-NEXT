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

    images?: any[];
}

export interface BookNowFormProps {
    description: string;
    images: any[];
    imagePreviewUrl?: any[];
    time: number;
    start_date: string;
    end_date: string;
    book_image: string;
}
