import * as Yup from "yup";

const tagValidate = Yup.array(Yup.string()).required("Required field");

export const skillsFormSchema = Yup.object().shape({
    skills: tagValidate,
});
