import * as Yup from "yup";

export const applyFormSchema = Yup.object().shape({
    price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be greater than 0"),
    recursion: Yup.number()
        .required("Recursion is required")
        .min(0, "Recursion must be greater than 0"),
    remarks: Yup.string().required("Remarks is required"),
});
