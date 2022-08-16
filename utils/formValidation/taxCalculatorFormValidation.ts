import * as Yup from "yup";

const numberValidate = Yup.number().nullable().required("Required field");
const maritalStatusValidate = Yup.mixed().oneOf(["Married", "Unmarried"]);
const incomeStatusValidate = Yup.mixed().oneOf(["Yearly", "Monthly"]);

export const taxCalculatorSchema = Yup.object().shape({
    salary: numberValidate,
    festival_bonus: numberValidate,
    allowance: numberValidate,
    marital_status: maritalStatusValidate,
    income_time: incomeStatusValidate,
    pf: numberValidate,
    cit: numberValidate,
    life_insurance: numberValidate,
    medical_insurance: numberValidate,
    others: numberValidate,
});

export default taxCalculatorSchema;
