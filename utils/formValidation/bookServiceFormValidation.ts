import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const numReqOnly = Yup.number().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const bookServiceSchema = Yup.object().shape({
    description: stringReqOnly,
    // start_time: numReqOnly,
    start_date: dateValidation,
    end_date: dateValidation,
    budget_from: numReqOnly,
    // requirements: Yup.string().required("Requirements is required"),
});
