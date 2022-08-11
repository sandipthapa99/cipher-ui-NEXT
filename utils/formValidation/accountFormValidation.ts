import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const tagValidate = Yup.array(Yup.string()).required("Required field");

export const accountFormSchema = Yup.object().shape({
    // full_name: stringReqOnly,
    phone: Yup.number().nullable().required("Required field"),
    full_name: stringReqOnly,
    email: emailValidate,
    bio: stringReqOnly,
    gender: stringReqOnly,
    date_of_birth: stringReqOnly,
    skill: tagValidate,
    active_hour_start: dateValidation,
    active_hour_end: dateValidation,
    // hour_rate: Yup.number().nullable().required("Required field"),
    // user_type: stringReqOnly,
    userType: Yup.mixed().oneOf(["client", "tasker"]),
    country: stringReqOnly,
    address_line1: stringReqOnly,
    address_line2: stringReqOnly,
    language: stringReqOnly,
    charge_currency: stringReqOnly,
    profile_visibility: stringReqOnly,
    task_preferences: stringReqOnly,
    // profile_image: stringReqOnly,
});
