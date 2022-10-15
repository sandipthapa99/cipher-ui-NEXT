import * as Yup from "yup";

export const applyFormSchema = ({
    budget_from,
    budget_to,
}: {
    budget_from: number;
    budget_to: number;
}) =>
    Yup.object().shape({
        remarks: Yup.string().required("Remarks is required"),
        budget_to: Yup.number()
            .required("Required field")
            .lessThan(budget_to + 1, `Must not be greater than ${budget_to}`)
            .moreThan(budget_from - 1, `Must not be less than ${budget_from}`),
    });
