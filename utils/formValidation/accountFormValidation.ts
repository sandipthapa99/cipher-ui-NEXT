import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const tagValidate = Yup.array(Yup.string()).required("Required field");

export const accountFormSchema = Yup.object().shape({
    fullName: stringReqOnly,
    email: emailValidate,
    bio: stringReqOnly,
    gender: stringReqOnly,
    dateOfBirth: stringReqOnly,
    specialities: tagValidate,
    activeHoursFrom: dateValidation,
    activeHoursTo: dateValidation,
    // userType: stringReqOnly,
    country: stringReqOnly,
    addressLine1: stringReqOnly,
    addressLine2: stringReqOnly,
    language: stringReqOnly,
    currency: stringReqOnly,
    visibility: stringReqOnly,
    taskPreferences: stringReqOnly,
});
