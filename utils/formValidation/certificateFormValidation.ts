import * as Yup from "yup";

const stringReqOnly = Yup.string().required("Required field");
const urlValidation = Yup.string()
    .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
    )
    .required("Required field");

export const certificateFormSchema = Yup.object().shape({
    name: stringReqOnly,
    issuing_organization: stringReqOnly,
    description: stringReqOnly,
    credential_id: stringReqOnly,
    certificate_url: urlValidation,
    issued_date: Yup.date().required().nullable(true),
    expire_date: Yup.date()
        .when("issued_date", (issued_date, schema) => {
            if (issued_date) {
                const dayAfter = new Date(issued_date.getTime());
                return schema
                    .min(dayAfter, "End date has to be after than issued date")
                    .nullable(true);
            }
            return Yup.date().nullable(true);
        })
        .nullable(true),
});
