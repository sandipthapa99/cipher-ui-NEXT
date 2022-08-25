export interface AddPortfolioProps {
    title: string;
    description: string;
    credential_url: string;
    issued_date: string;
    id: number;
    file: any;
    image: any;
}

export interface AddSkills {
    showModal?: boolean;
    handleClose?: () => void;

    name?: string;
}
