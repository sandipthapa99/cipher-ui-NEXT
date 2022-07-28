import * as Yup from "yup";

let priceValidate, stringReqOnly;

stringReqOnly = Yup.string().required("Required field");
priceValidate = Yup.string().required("Required field");

export const equipmentFormSchema = Yup.object().shape({
    chargeFor: stringReqOnly,
    price: priceValidate,
    remarks: stringReqOnly,
});
