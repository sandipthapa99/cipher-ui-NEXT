import * as Yup from "yup";

export const applyTaskSchema = Yup.object().shape({
    price: Yup.number()
        .required("Price is required")
        .min(0, "Price must be greater than 0"),
    remarks: Yup.string().required("Remarks is required"),
    // budget_to: Yup.number()
    //     .required("Required field")
    //     .lessThan(budget_to + 1, `Must not be greater than ${budget_to}`)
    //     .moreThan(budget_from - 1, `Must not be less than ${budget_from}`),
});
