import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const numReqOnly = Yup.number().required("Required field");

export const bookServiceSchema = Yup.object().shape({
    description: stringReqOnly,
    time: numReqOnly,
    image: stringReqOnly,
    date: stringReqOnly,
});
