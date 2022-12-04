export interface InputFieldProps {
    name: string;
    labelName?: string;
    touch?: boolean;
    error?: string;
    placeHolder?: string;
    textMuted?: string;
    as?: string;
    typeOf?: string;
    fieldRequired?: boolean;
    forgotPassword?: string;
    variables?: {
        label: string;
        value: string;
    }[];
    data?: any;
    haveIcon?: boolean;
    inputIcon?: any;
}
