import * as Yup from "yup";

const revisionReasonValidate = Yup.string().required("Required field");

export const reportRevisionFormSchema = Yup.object().shape({
    reason: revisionReasonValidate,
});
