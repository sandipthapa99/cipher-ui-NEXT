import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const numReqOnly = Yup.number().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const bookServiceSchema = Yup.object().shape({
    description: stringReqOnly,
    time: numReqOnly,
    requirements: Yup.string().required("Requirements is required"),
    start_date: dateValidation,
    end_date: dateValidation,
    city: Yup.string().required("city is required"),
});
