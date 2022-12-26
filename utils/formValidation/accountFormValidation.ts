import parse from "date-fns/parse";
import dayjs from "dayjs";
import * as Yup from "yup";
const stringReqOnly = Yup.string().required("Required field");
const stringUnReq = Yup.string().required("Required Field ");
const dateValidation = Yup.string().required("Required field").nullable();
const tagValidate = Yup.array(Yup.string()).required("Required field");

export const accountFormSchema = Yup.object().shape({
    // full_name: stringReqOnly,
    // phone: Yup.number().nullable().required("Required field"),
    first_name: stringReqOnly,
    last_name: stringReqOnly,
    //profile_image: stringUnReq,
    bio: stringReqOnly,
    gender: stringReqOnly,
    //user_type: stringReqOnly,
    date_of_birth: Yup.date()
        .max(
            dayjs(new Date()).endOf("month").subtract(16, "years").toDate(),
            "You must be at least 16 years"
        )
        .required("Required"),
    experience_level: Yup.string().required("Select your experience level "),
    // skill: tagValidate,
    active_hour_start: dateValidation,
    active_hour_end: dateValidation,
    hourly_rate: Yup.number().nullable().required("Required field"),
    //checkboxUser: Yup.mixed().required("Required field"),
    country: Yup.string().required("Required Field"),
    city: Yup.string().required("Required Field"),
    address_line1: stringReqOnly,
    //address_line2: stringUnReq,
    //language: stringUnReq,
    charge_currency: stringUnReq,
    profile_visibility: stringReqOnly,
    task_preferences: stringReqOnly,
    //designation: stringReqOnly,
    interests: tagValidate,
    //checkboxUser: Yup.string().required("Required Field"),

    // profile_image: stringReqOnly,
});
