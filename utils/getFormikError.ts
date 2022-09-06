import type { FormikErrors, FormikTouched } from "formik";

export class GetFormikError<T extends Record<string, any>> {
    constructor(
        private readonly touched: FormikTouched<T>,
        private readonly errors: FormikErrors<T>
    ) {}
    getFieldError(key: keyof T) {
        return this.touched[key] && this.errors[key]
            ? this.errors[key]
            : undefined;
    }
}
