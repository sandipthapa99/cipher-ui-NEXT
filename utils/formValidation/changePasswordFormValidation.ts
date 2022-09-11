import * as Yup from "yup";

const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*+-])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*+-]{6,16}$/,
        "Password must contain 1 numberic value, 1 uppercase and 1 special character."
    );

const changePasswordFormSchema = Yup.object().shape({
    old_password: passwordValidate,
    new_password: passwordValidate,
    confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password")], "Passwords do not match")
        .required("Required field"),
});

export default changePasswordFormSchema;
