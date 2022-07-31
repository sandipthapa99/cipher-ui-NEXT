export interface BookNowModalCardProps {
    title: string;
    price: number;
    description: string;
    show?: boolean;
    handleClose?: () => void;
    image: string;
}

export interface BookNowFormProps {
    problemDescription: string;
    image?: string;
    time: number;
    date: string;
}
