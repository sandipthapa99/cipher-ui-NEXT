export interface AddPortfolio {
    showModal?: boolean;
    handleClose?: () => void;
    title?: string;
    description?: string;
    url?: null;
    date?: string | null;
}

export interface AddSkills {
    showModal?: boolean;
    handleClose?: () => void;

    name?: string;
}
