import type { ReactNode } from "react";

export interface SelectSearchFieldProps {
    name: string;
    labelName?: ReactNode;
    placeHolder?: string;
    error?: string;
    touch?: boolean;
    textMuted?: ReactNode;
    searchable?: boolean;
    clearable?: boolean;
    handleChange: (value: string) => void;
    options: { value: string; label: string }[];
    nothingFound?: ReactNode;
}
