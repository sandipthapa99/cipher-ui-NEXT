export interface File {
    type: string;
    name: string;
    path: string;
    size: number;
    ladtModified: number;
    webkitRelativePath: string;
}
export interface AddPortfolioProps {
    title: string;
    description: string;
    credential_url: string;
    issued_date: string;
    id: number;
    files: File[];
    images: File[];
    imagePreviewUrl?: any[];
    pdfPreviewUrl?: any[];
}

export interface AddSkills {
    showModal?: boolean;
    handleClose?: () => void;

    name?: string;
}
