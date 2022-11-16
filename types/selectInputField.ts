export interface SelectOptionProps {
    id: number | string;
    value: number | string;
    label: string;
}

export interface SelectOptionRevisionProps {
    id: number | string;
    value: string;
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
    getData?: any;
    onChange?: any;
    defaultValue?: any;
}
