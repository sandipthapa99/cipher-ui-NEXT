export interface AddPortfolio {
    showModal?: boolean;
    handleClose?: () => void;

    title?: string;
    description?: string;
    url?: string;
    date?: string;
}