import * as Yup from "yup";

const numberValidate = Yup.number()
    .required("Required field")
    .typeError("salary must be a number");
const numberUnrequiredValidate = Yup.number().typeError(
    "Value must be a number"
);

const maritalStatusValidate = Yup.mixed().oneOf(["Married", "Unmarried"]);
const incomeStatusValidate = Yup.mixed().oneOf(["Yearly", "Monthly"]);

export const taxCalculatorSchema = Yup.object().shape({
    salary: numberValidate,
    festival_bonus: numberUnrequiredValidate,
    allowance: numberUnrequiredValidate,
    marital_status: maritalStatusValidate,
    income_time: incomeStatusValidate,
    pf: numberUnrequiredValidate,
    cit: numberUnrequiredValidate,
    life_insurance: numberUnrequiredValidate,
    medical_insurance: numberUnrequiredValidate,
    others: numberUnrequiredValidate,
});

export default taxCalculatorSchema;
