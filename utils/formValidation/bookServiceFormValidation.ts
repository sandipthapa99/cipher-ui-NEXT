import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");

export const bookServiceSchema = ({
    budget_from,
    budget_to,
}: {
    budget_from: number;
    budget_to: number;
}) =>
    Yup.object().shape({
        description: stringReqOnly,
        budget_to: Yup.number()
            .required("Required field")
            .lessThan(budget_to + 1, `Must not be greater than ${budget_to}`)
            .moreThan(budget_from - 1, `Must not be less than ${budget_from}`),

        start_date: Yup.date().nullable(true),

        end_date: Yup.date()
            .when("start_date", (start_date, schema) => {
                if (start_date) {
                    const dayAfter = new Date(start_date.getTime());
                    return schema
                        .min(
                            dayAfter,
                            "End date has to be after than start date"
                        )
                        .nullable(true);
                }
                return Yup.date().required("Required field").nullable(true);
            })
            .nullable(true),
    });
