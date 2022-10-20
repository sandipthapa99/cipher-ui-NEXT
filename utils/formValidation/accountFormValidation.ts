import parse from "date-fns/parse";
import * as Yup from "yup";
const stringReqOnly = Yup.string().required("Required field");
const stringUnReq = Yup.string();
const dateValidation = Yup.date().nullable().required("Required field");
const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const tagValidate = Yup.array(Yup.string()).required("Required field");

export const accountFormSchema = Yup.object().shape({
    // full_name: stringReqOnly,
    // phone: Yup.number().nullable().required("Required field"),
    first_name: stringReqOnly,
    last_name: stringReqOnly,
    profile_image: stringUnReq,
    bio: stringReqOnly,
    gender: stringReqOnly,
    date_of_birth: Yup.date()
        .transform(function (value, originalValue) {
            if (this.isType(value)) {
                return value;
            }
            const result = parse(originalValue, "dd.MM.yyyy", new Date());
            return result;
        })
        .typeError("please enter a valid date")
        .required()
        .max("2007-11-13", "You must be over 18"),

    skill: tagValidate,
    active_hour_start: dateValidation,
    active_hour_end: dateValidation,
    hourly_rate: Yup.number().nullable().required("Required field"),
    user_type: Yup.mixed().required("Required field"),
    country: stringUnReq,
    address_line1: stringReqOnly,
    address_line2: stringUnReq,
    language: stringUnReq,
    charge_currency: stringReqOnly,
    profile_visibility: stringReqOnly,
    task_preferences: stringReqOnly,
    designation: stringReqOnly,
    // profile_image: stringReqOnly,
});
