import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");

export const HelpandSupport = Yup.object().shape({
    topic: stringReqOnly,
    // specification: stringReqOnly,
    // file: stringReqOnly,
    details: stringReqOnly,
});
