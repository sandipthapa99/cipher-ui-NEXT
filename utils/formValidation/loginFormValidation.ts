import * as Yup from "yup";

export const passwordValidate = Yup.string()
    .required("Required field")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

export const usernameValidate = Yup.string().required("Username is required");
export const otpValidate = Yup.number().required("OTP is required");
export const phoneValidate = Yup.string()
    .required("Phone is required")
    // .matches(/^[0-9]+$/, "Phone can only contain numbers")
    .min(10, "Phone is too short - should be 10 chars minimum.")
    .max(15, "Phone is too long - should be 10 chars maximum.");

export const getLoginSchema = (isPhoneNumber = false) => {
    const validationSchema = Yup.object().shape({
        username: isPhoneNumber ? phoneValidate : usernameValidate,
        password: passwordValidate,
    });
    return validationSchema;
};

export const emailResetFormSchema = Yup.object().shape({
    password: passwordValidate,
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Required field"),
});

export const emailResendSchema = Yup.object().shape({
    email: Yup.string().email().required("Required field"),
});

export const resetFormSchema = Yup.object().shape({
    password: passwordValidate,
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Required field"),
    otp: otpValidate,
});
