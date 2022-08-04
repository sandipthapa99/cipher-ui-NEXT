import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const certificateFormSchema = Yup.object().shape({
    name: stringReqOnly,
    organization: stringReqOnly,
    description: stringReqOnly,
    credentialId: stringReqOnly,
    certificateURL: stringReqOnly,
    issuedDate: dateValidation,
    expirationDate: dateValidation,
});
