import * as Yup from "yup";

const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required field"),
});

export default emailValidationSchema;