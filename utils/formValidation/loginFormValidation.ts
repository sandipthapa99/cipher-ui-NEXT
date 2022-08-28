import * as Yup from "yup";

const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

export const loginFormSchema = Yup.object().shape({
    username: emailValidate,
    password: passwordValidate,
});

export const resetFormSchema = Yup.object().shape({
    password: passwordValidate,
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Required field"),
});
