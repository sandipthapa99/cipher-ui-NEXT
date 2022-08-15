import { phoneRegExp } from "utils/helpers";
import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const stringReqOnly = Yup.string().required("Required field");
const fileUploadValidate = Yup.array()
    .length(1, "Required Field")
    .of(
        Yup.mixed()
            .test("fileFormat", "Unsupported file format", (value) => {
                return value && SUPPORTED_FORMATS.includes(value.type);
            })
            .test("fileSize", "File too large", (value) => {
                return value && value.size <= FILE_SIZE;
            })
    )
    .required("Required field");
const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const phoneValidate = Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Required field");

export const uploadCVFormValidation = Yup.object().shape({
    full_name: stringReqOnly,
    email: emailValidate,
    phone: phoneValidate,
    cv: fileUploadValidate,
    applied_position: stringReqOnly,
    g_recaptcha_response: stringReqOnly,
});
