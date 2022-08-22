import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const KYCDocumentSchema = Yup.object().shape({
    document_type: stringReqOnly,
    document_id: stringReqOnly,
    // file: stringReqOnly,
    issuer_organization: stringReqOnly,
    issued_date: dateValidation,
});
