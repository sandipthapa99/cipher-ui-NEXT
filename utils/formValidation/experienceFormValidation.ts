import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const experienceFormSchema = Yup.object().shape({
    title: stringReqOnly,
    description: stringReqOnly,
    typeOfEmployment: stringReqOnly,
    companyName: stringReqOnly,
    location: stringReqOnly,
    startDate: dateValidation,
    endDate: dateValidation,
});
