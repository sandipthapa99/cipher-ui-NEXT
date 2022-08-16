import { phoneRegExp } from "utils/helpers";
import * as Yup from "yup";

let emailValidate, stringValidate, phoneValidate, stringReqOnly, selectValidate;

emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
stringValidate = Yup.string()
    .min(3, "Must be 3 charactersor or more")
    .required("Required field");
stringReqOnly = Yup.string().required("Required field");
// isCheckValidate = Yup.bool().oneOf([true]).required();
phoneValidate = Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required field");
selectValidate = Yup.number().required("Required field");

export const contactFormSchema = Yup.object().shape({
    full_name: stringValidate,
    email: emailValidate,
    message: stringReqOnly,
    // isAgree: isCheckValidate,
    // g_recaptcha_response: stringReqOnly,
});
export const FeedbackFormSchema = Yup.object().shape({
    fullName: stringValidate,
    subject: stringValidate,
    email: emailValidate,
    message: stringReqOnly,
    // isAgree: isCheckValidate,
    // g_recaptcha_response: stringReqOnly,
});
export const SupportFormSchema = Yup.object().shape({
    full_name: stringValidate,
    email: emailValidate,
    phone: phoneValidate,
    type: selectValidate,
    reason: stringReqOnly,
    // isAgree: isCheckValidate,
    // g_recaptcha_response: stringReqOnly,
});
export const FaqFormSchema = Yup.object().shape({
    fullName: stringValidate,
    email: emailValidate,
    phoneNumber: phoneValidate,
    message: stringReqOnly,
});

export default contactFormSchema;
