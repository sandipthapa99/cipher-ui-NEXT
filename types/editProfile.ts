export interface AddPortfolioProps {
    title: string;
    description: string;
    credential_url: string;
    issued_date: string;
    id: number;
    files: any[];
    images: any[];
    imagePreviewUrl?: any[];
    pdfPreviewUrl?: any[];
}

export interface AddSkills {
    showModal?: boolean;
    handleClose?: () => void;

    name?: string;
}
