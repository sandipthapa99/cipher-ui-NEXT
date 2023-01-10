import dayjs from "dayjs";
import * as Yup from "yup";
const stringReq = Yup.string()
    .required("Required field")
    .matches(/^[^!@#$%^&*+=<>:;|~]*$/, {
        message: "Symbols are not allowed",
    })
    .matches(/^[^\d]*$/, "Field cannot contain numbers");

const stringUnReq = Yup.string().required("Required Field ");
const dateValidation = Yup.string().required("Required field").nullable();
const tagValidate = Yup.array().min(1, "Required field");

export const accountFormSchema = Yup.object().shape({
    first_name: stringReq,
    last_name: stringReq,
    bio: stringUnReq,
    gender: stringReq,
    date_of_birth: Yup.date()
        .max(
            dayjs(new Date()).endOf("month").subtract(16, "years").toDate(),
            "You must be at least 16 years"
        )
        .required("Required"),
    experience_level: Yup.string().required("Select your experience level"),
    skill: tagValidate,
    interests: tagValidate,
    active_hour_start: dateValidation,
    active_hour_end: dateValidation,
    hourly_rate: Yup.number().nullable().required("Required field"),
    country: stringUnReq,
    city: stringUnReq,
    address_line1: stringReq,
    charge_currency: stringUnReq,
    profile_visibility: stringUnReq,
    task_preferences: stringUnReq,
});
