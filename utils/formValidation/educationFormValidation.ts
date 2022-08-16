import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const educationFormSchema = Yup.object().shape({
    school: stringReqOnly,
    description: stringReqOnly,
    degree: stringReqOnly,
    field_of_study: stringReqOnly,
    location: stringReqOnly,
    start_date: dateValidation,
    end_date: dateValidation,
});
