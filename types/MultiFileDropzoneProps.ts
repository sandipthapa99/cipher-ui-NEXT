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
    error?: string;
    touch?: boolean;
    style?: CSSProperties;
    displayView?: "grid" | "list";
    showFileDetail?: boolean;
    withCloseButton?: boolean;
}
