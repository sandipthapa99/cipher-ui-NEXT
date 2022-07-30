import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const priceValidate = Yup.string().required("Required field");

export const equipmentFormSchema = Yup.object().shape({
    chargeFor: stringReqOnly,
    price: priceValidate,
    remarks: stringReqOnly,
});
