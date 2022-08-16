import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const urlValidation = Yup.string().url().required("Required field");
const fileValidation = Yup.string().nullable();

export const addPortfolioSchema = Yup.object().shape({
    title: stringReqOnly,
    description: stringReqOnly,
    credential_url: urlValidation,
    issued_date: dateValidation,
    image: fileValidation,
    file: fileValidation,
});
