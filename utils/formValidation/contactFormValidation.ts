import { phoneRegExp } from "utils/helpers";
import * as Yup from "yup";

const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const stringValidate = Yup.string()
    .min(3, "Must be 3 charactersor or more")
    .required("Required field");
const stringReqOnly = Yup.string().required("Required field");
// isCheckValidate = Yup.bool().oneOf([true]).required();
const phoneValidate = Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required field");
const selectValidate = Yup.number()
    .required("Required field")
    .typeError("Please select a category");

export const contactFormSchema = Yup.object().shape({
    full_name: stringValidate,
    email: emailValidate,
    message: stringReqOnly,
    // isAgree: isCheckValidate,
    // g_recaptcha_response: stringReqOnly,
});
export const FeedbackFormSchema = Yup.object().shape({
    subject: stringValidate,
    feedback_category: selectValidate,
    description: stringReqOnly,
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
    full_name: stringValidate,
    email: emailValidate,
    phone: phoneValidate,
    message: stringReqOnly,
});

export default contactFormSchema;
