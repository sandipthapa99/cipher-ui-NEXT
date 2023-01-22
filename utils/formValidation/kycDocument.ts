import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const fileUploadValidate = Yup.array()
    .length(1, "Required Field")
    .of(
        Yup.mixed()
            .test("fileFormat", "Unsupported file format", (value) => {
                return value;
            })
            .test("fileSize", "File too large", (value) => {
                return value;
            })
    )
    .required("Required field");

export const KYCDocumentSchema = Yup.object().shape({
    document_type: stringReqOnly,
    document_id: stringReqOnly,
    file: fileUploadValidate,
    issuer_organization: stringReqOnly,
    issued_date: dateValidation,
});
