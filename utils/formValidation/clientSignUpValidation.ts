import { phoneRegExp } from "utils/helpers";
import * as Yup from "yup";

const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const stringValidate = Yup.string()
    .min(3, "Must be 3 charactersor or more")
    .required("Required field");
const phoneValidate = Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required field");
const stringReqOnly = Yup.string().required("Required field");
const isCheckValidate = Yup.bool().required();
const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");
const genderValidate = Yup.string().required("Required Field");

const clientSignUpSchema = Yup.object().shape({
    firstName: stringReqOnly,
    lastName: stringReqOnly,
    email: emailValidate,
    phoneNumber: phoneValidate,
    password: passwordValidate,
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
    ),
    gender: genderValidate,
    isAgree: isCheckValidate,
});

export default clientSignUpSchema;
