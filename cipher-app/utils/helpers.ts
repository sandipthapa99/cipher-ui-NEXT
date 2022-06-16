// form-group validate
export const checkFormGroup = (error: any) => {
    const currentClass = "form-group";
    const errorClass = "validate";
    return error ? `${currentClass} ${errorClass}` : currentClass;
};

// form-control validate
export const checkFormControl = (error: any, touched: any) => {
    const currentClass = "form-control";
    const errorClass = "is-invalid";
    return error && touched ? `${currentClass} ${errorClass}` : currentClass;
};