import * as Yup from "yup";

const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

const changePasswordFormSchema = Yup.object().shape({
    old_password: passwordValidate,
    new_password: passwordValidate,
    confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password")], "Passwords do not match")
        .required("Required field"),
});

export default changePasswordFormSchema;
