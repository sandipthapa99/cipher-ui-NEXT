import * as Yup from "yup";

let emailValidate, passwordValidate;

emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

const loginFormSchema = Yup.object().shape({
    email: emailValidate,
    password: passwordValidate,
});

export default loginFormSchema;
