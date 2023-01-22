import * as Yup from "yup";
const dateValidation = Yup.date().nullable().required("Required field");

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
    start_date: dateValidation,
    end_date: Yup.date()
        .when("start_date", (start_date, schema) => {
            if (start_date) {
                const dayAfter = new Date(start_date.getTime());
                return schema
                    .min(dayAfter, "End date has to be after than start date")
                    .nullable(true);
            }
            return Yup.date().nullable(true);
        })
        .nullable(true),
});

export const postServiceSchema = Yup.object().shape({
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
