export interface BookNowModalCardProps {
    title: string;
    price: number;
    description: string;
    problemDescription?: string;
    show?: boolean;
    handleClose?: () => void;
    image: string;
}
