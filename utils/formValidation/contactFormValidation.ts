import * as Yup from "yup";
import { phoneRegExp } from "utils/helpers";

let emailValidate,
    stringValidate,
    phoneValidate,
    stringReqOnly;

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

export const contactFormSchema = Yup.object().shape({
    fullName: stringValidate,
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
    fullName: stringValidate,
    email: emailValidate,
    phoneNumber: phoneValidate,
    issueType:stringValidate,
    message: stringReqOnly,
    // isAgree: isCheckValidate,
    // g_recaptcha_response: stringReqOnly,
});

export default contactFormSchema;
