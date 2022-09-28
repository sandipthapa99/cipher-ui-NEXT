import type { FormikTouched } from "formik";
import type { ReactNode } from "react";

export interface DatePickerProps {
    name: string;
    labelName?: string;
    touch?: boolean | FormikTouched<Date>;
    dateFormat?: string;
    timeOnly?: boolean;
    error?: boolean | FormikTouched<Date>;
    placeHolder?: string;
    textMuted?: string;
    as?: string;
    fieldRequired?: boolean;
    forgotPassword?: string;
}

export interface DatePickerFieldProps {
    name: string;
    labelName?: ReactNode;
    placeHolder?: string;
    error?: string;
    touch?: boolean;
    fieldRequired?: boolean;
    textMuted?: ReactNode;
    handleChange: (value: Date) => void;
}
