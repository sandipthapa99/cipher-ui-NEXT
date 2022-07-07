import * as Yup from "yup";
import { phoneRegExp } from "utils/helpers";

let emailValidate,
    stringValidate,
    stringReqOnly;

emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
stringValidate = Yup.string()
    .min(3, "Must be 3 charactersor or more")
    .required("Required field");
stringReqOnly = Yup.string().required("Required field");
// isCheckValidate = Yup.bool().oneOf([true]).required();

const contactFormSchema = Yup.object().shape({
    fullName: stringValidate,
    email: emailValidate,
    message: stringReqOnly,
    // isAgree: isCheckValidate,
    // g_recaptcha_response: stringReqOnly,
});

export default contactFormSchema;
