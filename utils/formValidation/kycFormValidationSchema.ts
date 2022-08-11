import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const KYCFormSchema = Yup.object().shape({
    fullName: stringReqOnly,
    identityType: stringReqOnly,
    identityNumber: stringReqOnly,
    issuedFrom: dateValidation,
    issuedDate: dateValidation,
    expiryDate: dateValidation,
    panNumber: stringReqOnly,
    issuedLoaction: stringReqOnly,
    panIssuedDate: stringReqOnly,
    bankName: stringReqOnly,
    bankAccountName: stringReqOnly,
    bankAccountNumber: stringReqOnly,
});
