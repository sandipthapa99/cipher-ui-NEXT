import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const numReqOnly = Yup.number().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const bookServiceSchema = Yup.object().shape({
    problemDescription: stringReqOnly,
    time: numReqOnly,
    image: stringReqOnly,
    startdate: dateValidation,
    enddate: dateValidation,
});
