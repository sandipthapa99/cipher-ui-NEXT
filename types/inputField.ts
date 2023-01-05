export interface InputFieldProps {
    name: string;
    labelName?: string;
    touch?: boolean;
    withAsterisk?: boolean;
    error?: string;
    placeHolder?: string;
    textMuted?: string;
    defaultValue?: any;
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
    create?: boolean;
    value?: any;
}

// interface defaultValue {
//     value: number | string;
//     label: string;
// }
