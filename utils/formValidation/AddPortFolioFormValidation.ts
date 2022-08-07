import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const urlValidation = Yup.string().url().required("Required field");

export const addPortfolioSchema = Yup.object().shape({
    title: stringReqOnly,
    description: stringReqOnly,
    url: urlValidation,
    date: dateValidation,
});
