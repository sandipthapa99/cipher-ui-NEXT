import * as Yup from "yup";

export const postEntityServiceSchema = (
    is_requested: string,
    maxImages: number,
    maxVideos: number
) =>
    Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string()
            .required("Description is required")
            .min(10, "Description is too short"),
        highlights: Yup.array().required("Requirements is required"),
        currency: Yup.string().required("Currency is required"),
        // category: Yup.string().required("Category is required"),
        location: Yup.string().when("taskTypeRadio", {
            is: "onPremise",
            then: Yup.string().required("Location is required"),
        }),
        budget_type: Yup.string().required("Budget type is required"),
        end_date: Yup.string().when((_, schema) => {
            if (is_requested === "false") {
                return schema.nullable(true);
            }
            return Yup.string().required("End Date is required");
        }),
        city: Yup.string().required("City is required"),
        service: Yup.string().required("Service is required"),
        budget_to: Yup.number()
            .required("Budget to is required")
            .min(0, "Budget to must be greater than 0"),
        is_terms_condition: Yup.boolean()
            .required("The terms and conditions must be accepted.")
            .oneOf([true], "The terms and conditions must be accepted."),
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
                    return Yup.number()
                        .required("Required field")
                        .nullable(true);
                }),
            })
            .nullable(true),
        imagePreviewUrl: Yup.array().max(
            maxImages,
            `Cannot Upload more than ${maxImages} images`
        ),
        videoPreviewUrl: Yup.array().max(
            maxVideos,
            `Cannot Upload more than ${maxVideos} images`
        ),
    });
