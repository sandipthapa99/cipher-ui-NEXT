import * as Yup from "yup";

const interestValidate = Yup.array(Yup.string())
    .required("Required Field")
    .nullable();

export const addInterestSchema = Yup.object().shape({
    interests: interestValidate,
});
