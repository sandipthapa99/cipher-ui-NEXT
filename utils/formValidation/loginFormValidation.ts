import * as Yup from "yup";

const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

const usernameValidate = Yup.string().required("Username is required");
const phoneValidate = Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]+$/, "Phone can only contain numbers")
    .min(10, "Phone is too short - should be 10 chars minimum.")
    .max(10, "Phone is too long - should be 10 chars maximum.");

export const loginWithUsernameSchema = Yup.object().shape({
    username: usernameValidate,
    password: passwordValidate,
});
export const loginWithPhoneSchema = Yup.object().shape({
    phone: phoneValidate,
    password: passwordValidate,
});
