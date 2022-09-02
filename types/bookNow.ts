export interface BookNowModalCardProps {
    id?: string;
    title: string;
    price: number | string;
    description: string;
    show?: boolean;
    handleClose?: () => void;
    image?: string;
}

export interface BookNowFormProps {
    problemDescription: string;
    image: string;
    time: number;
    startdate: string | null;
    enddate: string | null;
    book_image: string;
}
