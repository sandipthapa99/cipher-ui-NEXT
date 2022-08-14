import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const emailValidate = Yup.string()
    .email("Invalid email address")
    .required("Required field");
const FILE_SIZE = 1024 * 1024;
const SUPPORTED_FORMATS = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

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

const urlValidation = Yup.string()
    .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
    )
    .required("Required field");

export const carrerApplyFormValidation = Yup.object().shape({
    full_name: stringReqOnly,
    email: emailValidate,
    phone: stringReqOnly,
    current_company: stringReqOnly,
    experience: stringReqOnly,
    portfolio_link: urlValidation,
    cv: fileUploadValidate,
    cover_letter: stringReqOnly,
    g_recaptcha_response: stringReqOnly,
});
