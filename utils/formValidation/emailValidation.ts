import { phoneRegExp } from "utils/helpers";
import * as Yup from "yup";

export const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
});

export const phoneNumberValidationSchema = Yup.object().shape({
    phone: Yup.string().matches(phoneRegExp, "Invalid phone number"),
});
