import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const bookServiceSchema = ({
    budget_from,
    budget_to,
}: {
    budget_from: number;
    budget_to: number;
}) =>
    Yup.object().shape({
        description: stringReqOnly,
        end_date: dateValidation,
        budget_to: Yup.number()
            .required("Required field")
            .lessThan(budget_to + 1, `Must not be greater than ${budget_to}`)
            .moreThan(budget_from - 1, `Must not be less than ${budget_from}`),
    });
