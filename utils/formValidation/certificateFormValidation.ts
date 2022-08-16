import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const urlValidation = Yup.string()
    .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
    )
    .required("Required field");

export const certificateFormSchema = Yup.object().shape({
    name: stringReqOnly,
    issuing_organization: stringReqOnly,
    description: stringReqOnly,
    credential_id: stringReqOnly,
    certificate_url: urlValidation,
    issued_date: dateValidation,
    expire_date: dateValidation,
});
