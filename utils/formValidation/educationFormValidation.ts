import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const dateValidation = Yup.date().nullable().required("Required field");

export const educationFormSchema = Yup.object().shape({
    school: stringReqOnly,
    description: stringReqOnly,
    degree: stringReqOnly,
    field_of_study: stringReqOnly,
    location: stringReqOnly,
    // start_date: dateValidation,
    // start_date: dateValidation,
    start_date: Yup.date().nullable(true),
    end_date: Yup.date()
        .when("start_date", (start_date, schema) => {
            if (start_date) {
                const dayAfter = new Date(start_date.getTime());
                return schema
                    .min(dayAfter, "End date has to be after than start date")
                    .nullable(true);
            }
            return Yup.date().required("Required field").nullable(true);
        })
        .nullable(true),
});
