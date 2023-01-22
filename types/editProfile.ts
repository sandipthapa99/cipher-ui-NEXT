export interface File {
    type: string;
    id: number;
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
    files: File[] | any;
    images: File[] | any;
    imagePreviewUrl?: any[];
    pdfPreviewUrl?: any[];
}

export interface AddSkills {
    showModal?: boolean;
    handleClose?: () => void;
    name?: string;
}

export interface AddInterests {
    showModal?: boolean;
    handleClose?: () => void;
    // interests?: {
    //     id: string;
    //     name: string;
    // }[];
    interests: [];
}

export interface EditPortfolioDetailProps {
    results: Result[];
}

export interface Result {
    id: number;
    images: EditImageInfo[];
    files: EditImageInfo[];
    title: string;
    description: string;
    issued_date: string;
    credential_url: string;
}

export interface EditImageInfo {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}

export interface EditImageInfo {
    id: number;
    name: string;
    size: string;
    media_type: string;
    media: string;
}
