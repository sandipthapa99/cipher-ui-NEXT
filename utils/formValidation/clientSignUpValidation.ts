import * as Yup from "yup";
import { phoneRegExp } from "utils/helpers";

let emailValidate,
    stringValidate,
    phoneValidate,
    stringReqOnly,
    isCheckValidate,
    passwordValidate,
    genderValidate;

emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
stringValidate = Yup.string()
    .min(3, "Must be 3 charactersor or more")
    .required("Required field");
phoneValidate = Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required field");
stringReqOnly = Yup.string().required("Required field");
isCheckValidate = Yup.bool().oneOf([true]).required();
passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");
genderValidate = Yup.string().required("Required Field");

const clientSignUpSchema = Yup.object().shape({
    firstName: stringReqOnly,
    lastName: stringReqOnly,
    email: emailValidate,
    phoneNumber: phoneValidate,
    password: passwordValidate,
    confirmPassword: passwordValidate,
    gender: genderValidate,
    isAgree: isCheckValidate,
});

export default clientSignUpSchema;
