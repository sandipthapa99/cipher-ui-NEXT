import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");

export const carrerApplyFormValidation = Yup.object().shape({
    full_name: stringReqOnly,
    email: emailValidate,
    phone: stringReqOnly,
    company: stringReqOnly,
    work_exp: stringReqOnly,
    portfolio: stringReqOnly,
    resume: stringReqOnly,
    addtional_info: stringReqOnly,
    g_recaptcha_response: stringReqOnly,
});
