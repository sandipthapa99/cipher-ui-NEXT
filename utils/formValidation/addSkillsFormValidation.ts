import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");

export const addSkillsSchema = Yup.object().shape({
    name: stringReqOnly,
});
