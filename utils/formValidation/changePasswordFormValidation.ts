import * as Yup from "yup";

const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

const changePasswordFormSchema = Yup.object().shape({
    currentPassword: passwordValidate,
    newPassword: passwordValidate,
    confirmPassword: passwordValidate,
});

export default changePasswordFormSchema;
