import * as Yup from "yup";

export const postTaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    requirements: Yup.string().required("Requirements is required"),
    category: Yup.string().required("Category is required"),
    location: Yup.string()
        .required("Location type is required")
        .oneOf(["remote", "onPremise"]),
    city: Yup.string().when("location", {
        is: "onPremise",
        then: Yup.string().required("Address is required"),
    }),
    budget_type: Yup.string().required("Budget type is required"),
    budget_fixed: Yup.number().when("budget_type", {
        is: "fixed",
        then: Yup.number()
            .required("Fixed budget is required")
            .min(0, { message: "Fixed budget must be greater than 0" }),
    }),
    budget_from: Yup.number().when("budget_type", {
        is: "variable",
        then: Yup.number()
            .required("Budget from is required")
            .min(0, { message: "Budget from must be greater than 0" }),
    }),
    budget_to: Yup.number().when("budget_type", {
        is: "variable",
        then: Yup.number()
            .required("Budget to is required")
            .min(0, { message: "Budget to must be greater than 0" }),
    }),
});
