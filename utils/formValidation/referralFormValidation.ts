import * as Yup from "yup";

const referralFormValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required field"),
    link: Yup.string().url("Invalid link").required("Required field"),
});

export default referralFormValidationSchema;
