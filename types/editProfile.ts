export interface AddPortfolioProps {
    title: string;
    description: string;
    credential_url: string;
    issued_date: string;
    file: string;
    image: string;
}

export interface AddSkills {
    showModal?: boolean;
    handleClose?: () => void;

    name?: string;
}
