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
    .min(10, "Password is too short - should be 10 chars minimum.")
    .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        "Password must contain 1 numberic value, 1 uppercase and 1 special character."
    );
const genderValidate = Yup.string().required("Required Field");

export const clientEmailSignUpSchema = Yup.object().shape({
    // firstName: stringReqOnly,
    // lastName: stringReqOnly,
    email: emailValidate,
    // phoneNumber: phoneValidate,
    password: passwordValidate,
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords do not match"
    ),
    // gender: genderValidate,
    // isAgree: isCheckValidate,
});

export const clientPhoneSignUpSchema = Yup.object().shape({
    phone: phoneValidate,
    password: passwordValidate,
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords do not match"
    ),
});

export const clientBothSignUpSchema = Yup.object().shape({
    email: emailValidate,
    phone: phoneValidate,
    password: passwordValidate,
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords do not match"
    ),
});
