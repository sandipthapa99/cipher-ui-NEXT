import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const numReqOnly = Yup.number().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const bookServiceSchema = Yup.object().shape({
    description: stringReqOnly,
    time: numReqOnly,
    start_date: dateValidation,
    end_date: dateValidation,
});
