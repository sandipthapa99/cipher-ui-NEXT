import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");

export const addPortfolioSchema = Yup.object().shape({
    title: stringReqOnly,
    description: stringReqOnly,
    url: stringReqOnly,
    date: stringReqOnly,
});
