import type { CSSProperties, ReactNode } from "react";

export interface MultiFileDropzoneProps {
    name: string;
    labelName?: ReactNode;
    textMuted?: ReactNode;
    accept?: string[];
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    imagePreview?: string;
    pdfPreview?: string;
    error?: string;
    touch?: boolean;
    style?: CSSProperties;
    imageDisplay?: "grid" | "list";
    showFileDetail?: boolean;
}
