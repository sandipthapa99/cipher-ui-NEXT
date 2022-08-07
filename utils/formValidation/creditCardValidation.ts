import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const numReqOnly = Yup.number()
    .required("Required field")
    .typeError("Field must be a number");

export const creditCardValidationSchema = Yup.object().shape({
    number: numReqOnly,
    name: stringReqOnly,
    expDate: stringReqOnly,
    cvv: numReqOnly,
});
