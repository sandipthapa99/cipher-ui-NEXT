export interface SelectOptionProps {
    id: number;
    value: number | string;
    label: string;
}

export interface SelectInputFieldProps {
    name: string;
    labelName?: string;
    touch?: boolean;
    error?: string;
    placeHolder?: string;
    textMuted?: string;
    fieldRequired?: boolean;
    options?: SelectOptionProps[];
}
