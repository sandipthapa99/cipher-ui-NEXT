export interface FileInputFieldProps {
    name: string;
    labelName?: string;
    touch?: boolean;
    error?: string;
    placeHolder?: string;
    textMuted?: string;
    fieldRequired?: boolean;
    handleChange: (val: any) => void;
    fileName?: any;
}
