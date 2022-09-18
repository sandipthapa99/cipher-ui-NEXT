import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");

export const bankFormSchema = Yup.object().shape({
    bank_name: stringReqOnly,
    branch_name: stringReqOnly,
    bank_account_name: stringReqOnly,
    bank_account_number: stringReqOnly,
});
