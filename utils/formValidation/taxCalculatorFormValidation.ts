import * as Yup from "yup";

const numberValidate = Yup.number().required("Required field");
const stringValidate = Yup.string().required("Required field");

export const taxCalculatorSchema = Yup.object().shape({
    salary: numberValidate,
    bonus: numberValidate,
    allowances: numberValidate,
    maritalStatus: stringValidate,
    incomeType: stringValidate,
    providentFund: numberValidate,
    investmentTrust: stringValidate,
    insurance: numberValidate,
});

export default taxCalculatorSchema;
