import type { FormikTouched } from "formik";

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
