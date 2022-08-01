import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const educationFormSchema = Yup.object().shape({
    school: stringReqOnly,
    description: stringReqOnly,
    degree: stringReqOnly,
    fieldOfStudy: stringReqOnly,
    location: stringReqOnly,
    startDate: dateValidation,
    endDate: dateValidation,
});
