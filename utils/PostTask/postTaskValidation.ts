import * as Yup from "yup";

export function checkIfFilesAreTooBig(files?: [File]): boolean {
    let valid = true;
    if (files) {
        files.map((file) => {
            const size = file.size / 1024 / 1024;
            if (size > 10) {
                valid = false;
            }
        });
    }
    return valid;
}
export function checkIfFilesAreCorrectType(files?: [File]): boolean {
    let valid = true;
    if (files) {
        files.map((file) => {
            if (
                !["application/pdf", "image/jpeg", "image/png"].includes(
                    file.type
                )
            ) {
                valid = false;
            }
        });
    }
    return valid;
}
export const postTaskValidationSchema = Yup.object().shape(
    {
        title: Yup.string().required("Required Title Field"),
        titleDescription: Yup.string().required("Required Title Description"),
        category: Yup.string().required("Required category should be selected"),
        subcategory: Yup.string().required(
            "Required sub-category should be selected"
        ),
        dateTime: Yup.string().required("Required date and time"),
        estimatedHour: Yup.number().required("Feild Required").min(1),
        fixedValue: Yup.number().when(["budgetType"], {
            is: "fixed",
            then: Yup.number().required("Required").min(0),
        }),
        budgetType: Yup.mixed().oneOf(["range", "fixed"]),
        minBudget: Yup.number().when(["budgetType"], {
            is: "range",
            then: Yup.number().required("Required").min(0),
        }),
        maxBudget: Yup.number().when(["budgetType"], {
            is: "range",
            then: Yup.number().required("Required").min(0),
        }),
        address: Yup.string().required("Required Address"),
        requirements: Yup.array().of(
            Yup.object().shape({ id: Yup.number(), name: Yup.string() })
        ),
        // image: Yup.array()
        //     .nullable()
        //     .required("VALIDATION_FIELD_REQUIRED")
        //     .test(
        //         "is-correct-file",
        //         "VALIDATION_FIELD_FILE_BIG",
        //         checkIfFilesAreTooBig
        //     )
        //     .test(
        //         "is-big-file",
        //         "VALIDATION_FIELD_FILE_WRONG_TYPE",
        //         checkIfFilesAreCorrectType
        //     ),
    },
    [
        ["budgetType", "fixedValue"],
        ["budgetType", "minBudget"],

        ["budgetType", "maxBudget"],
    ]
);
