import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const KYCFormSchema = Yup.object().shape({
    full_name: stringReqOnly,
    identity_type: stringReqOnly,
    identity_id: stringReqOnly,
    identity_issuer_organization: stringReqOnly,
    identity_issued_date: dateValidation,
    identity_valid_through: dateValidation,
    pan_number: stringReqOnly,
    pan_issued_from: stringReqOnly,
    pan_issued_date: stringReqOnly,
    bank_name: stringReqOnly,
    bank_account_name: stringReqOnly,
    bank_account_number: stringReqOnly,
});
