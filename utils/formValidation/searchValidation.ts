import * as Yup from "yup";

const searchValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
});

export default searchValidationSchema;
