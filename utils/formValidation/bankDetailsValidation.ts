import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const employmentType = Yup.mixed().oneOf(["Full Time", "Part Time"]);

export const bankFormSchema = Yup.object().shape({
    bank_name: stringReqOnly,
    branch_name: stringReqOnly,
    bank_account_name: stringReqOnly,
    bank_account_number: stringReqOnly,
});
