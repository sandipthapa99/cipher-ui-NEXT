import * as Yup from "yup";

export const postTaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    requirements: Yup.string().required("Requirements is required"),
    currency: Yup.string().required("Currency is required"),
    category: Yup.string().required("Category is required"),
    location: Yup.string().required("Location type is required"),
    budget_type: Yup.string().required("Budget type is required"),
    // budget_from: Yup.number().when("budget_type", {
    //     is: (value: string) => value !== "fixed",
    //     then: Yup.number()
    //         .required("Budget from is required")
    //         .min(0, { message: "Budget from must be greater than 0" }),
    // }),
    budget_to: Yup.number().when("budget_type", {
        is: (value: string) => value !== "fixed",
        then: Yup.number()
            .required("Budget to is required")
            .min(0, { message: "Budget to must be greater than 0" }),
    }),
});
