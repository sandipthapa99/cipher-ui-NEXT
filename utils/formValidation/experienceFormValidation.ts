import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const endDateValidation = Yup.string().nullable();
const employmentType = Yup.mixed().oneOf(["Full Time", "Part Time"]);

export const experienceFormSchema = Yup.object().shape({
    title: stringReqOnly,
    description: stringReqOnly,
    employment_type: employmentType,
    company_name: stringReqOnly,
    location: stringReqOnly,
    end_date: endDateValidation,
    start_date: dateValidation,
});
