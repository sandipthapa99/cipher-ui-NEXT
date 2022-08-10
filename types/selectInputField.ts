export interface SelectOptionProps {
    id: number;
    value: string | number;
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
