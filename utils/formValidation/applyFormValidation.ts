import * as Yup from "yup";

let priceValidate, stringReqOnly;

stringReqOnly = Yup.string().required("Required field");
priceValidate = Yup.string().required("Required field");

export const applyFormSchema = Yup.object().shape({
    price: priceValidate,
    remarks: stringReqOnly,
});
