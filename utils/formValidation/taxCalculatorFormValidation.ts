import * as Yup from "yup";

const numberValidate = Yup.number().nullable().required("Required field");
const maritalStatusValidate = Yup.mixed().oneOf(["married", "Unmarried"]);
const incomeStatusValidate = Yup.mixed().oneOf(["Yearly", "monthly"]);

export const taxCalculatorSchema = Yup.object().shape({
    salary: numberValidate,
    festivalBonus: numberValidate,
    allowances: numberValidate,
    maritalStatus: maritalStatusValidate,
    salaryType: incomeStatusValidate,
    providentFund: numberValidate,
    investmentTrust: numberValidate,
    insurance: numberValidate,
    medicalInsurance: numberValidate,
    others: numberValidate,
});

export default taxCalculatorSchema;
