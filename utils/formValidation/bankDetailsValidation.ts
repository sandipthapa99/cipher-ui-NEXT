import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const employmentType = Yup.mixed().oneOf(["Full Time", "Part Time"]);

export const bankFormSchema = Yup.object().shape({
    name: stringReqOnly,
    address: stringReqOnly,
    account_name: stringReqOnly,
    account_number: stringReqOnly,
    swift_code: stringReqOnly,
});
