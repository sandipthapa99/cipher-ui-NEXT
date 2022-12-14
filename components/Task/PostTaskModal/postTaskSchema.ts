import * as Yup from "yup";

export const postTaskSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    highlights: Yup.array().required("Requirements is required"),
    currency: Yup.string().required("Currency is required"),
    // category: Yup.string().required("Category is required"),
    location: Yup.string().when("taskTypeRadio", {
        is: "onPremise",
        then: Yup.string().required("Location is required"),
    }),
    budget_type: Yup.string().required("Budget type is required"),
    budget_to: Yup.number()
        .required("Budget to is required")
        .min(0, "Budget to must be greater than 0"),
    budget_from: Yup.number()
        .when("budgetTypeRadio", {
            is: "Variable",
            then: Yup.number().when("budget_to", (budget_to, schema) => {
                if (budget_to) {
                    return schema
                        .max(
                            budget_to,
                            "Budget from must be smaller than Budget to"
                        )
                        .nullable(true);
                }
                return Yup.number().required("Required field").nullable(true);
            }),
        })
        .nullable(true),
});

export const postTaskModalSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    requirements: Yup.array(),
    category: Yup.string().required("Category is required"),
    task_type: Yup.string().when("taskTypeRadio", {
        is: "onPremise",
        then: Yup.string().required("Location is required"),
    }),
    budget: Yup.string().required("Budget type is required"),
    minBudget: Yup.number()
        .required("Budget to is required")
        .min(0, "Budget to must be greater than 0"),
    maxBudget: Yup.number()
        .when("budgetTypeRadio", {
            is: "Variable",
            then: Yup.number().when("budget_to", (budget_to, schema) => {
                if (budget_to) {
                    return schema
                        .max(
                            budget_to,
                            "Budget from must be smaller than Budget to"
                        )
                        .nullable(true);
                }
                return Yup.number().required("Required field").nullable(true);
            }),
        })
        .nullable(true),
    date: Yup.date().nullable().required("Required field"),
});
