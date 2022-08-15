import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const endDateValidation = Yup.string().nullable();
const emptyValidation = Yup.string().nullable();
const employmentType = Yup.mixed().oneOf(["Full Time", "Part Time"]);

export const experienceFormSchema = Yup.object().shape({
    title: stringReqOnly,
    description: stringReqOnly,
    employment_type: employmentType,
    company_name: stringReqOnly,
    location: stringReqOnly,
    start_date: dateValidation,
    end_date: endDateValidation,
    empty_date: emptyValidation,
});
