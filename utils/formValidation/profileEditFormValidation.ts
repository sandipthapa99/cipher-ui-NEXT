import { phoneRegExp } from "utils/helpers";
import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");
const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const phoneValidate = Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required field");
const tagValidate = Yup.array(Yup.string()).required("Required field");

export const profileEditFormSchema = Yup.object().shape({
    full_name: stringReqOnly,
    bio: stringReqOnly,
    phone: phoneValidate,
    address_line1: stringReqOnly,
    address_line2: stringReqOnly,
    active_hour_start: dateValidation,
    active_hour_end: dateValidation,
    skill: tagValidate,
    hourly_rate: stringReqOnly,
});
