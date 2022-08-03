import * as Yup from "yup";

let  revisionReasonValidate;
revisionReasonValidate = Yup.string().required("Required field");

export const reportRevisionFormSchema = Yup.object().shape({
   
    revision_reason: revisionReasonValidate,
})