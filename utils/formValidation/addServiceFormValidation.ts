import * as Yup from "yup";

const StrigReqValidate = Yup.string().required("Required field");

const numberValidate = Yup.number()
    .required("Required field")
    .typeError("This must be a number");

const highlightValidate = Yup.array(
    Yup.object()
        .shape({ id: Yup.number(), name: Yup.string() })
        .required("Required field")
);

export const addServiceFormSchema = Yup.object().shape({
    title: StrigReqValidate,
    budget_type: Yup.string(),
    budget_from: numberValidate,
    description: StrigReqValidate,
    highlights: highlightValidate,
    location: StrigReqValidate,
    images: Yup.array()
        .max(4, "Cannot upload more than 5 files")
        // .length(0, "Required field"),
        .min(1, "Required field"),
    video: Yup.string(),
    no_of_revisions: numberValidate,
    category: numberValidate,
    city: numberValidate,
    is_active: Yup.boolean().required(),
    currency: numberValidate,
});
