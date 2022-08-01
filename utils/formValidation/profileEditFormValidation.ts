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

export const profileEditFormSchema = Yup.object().shape({
    name: stringReqOnly,
    bio: stringReqOnly,
    email: emailValidate,
    phone: phoneValidate,
    addressLine1: stringReqOnly,
    addressLine2: stringReqOnly,
    activeHoursFrom: dateValidation,
    activeHoursTo: dateValidation,
    specialities: stringReqOnly,
    baseRatePerHour: stringReqOnly,
});
