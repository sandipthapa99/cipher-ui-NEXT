import * as Yup from "yup";

let categoryValidate, searchValidate;

categoryValidate = Yup.string().required("Required field");
searchValidate = Yup.string().required("Required field");

const HomeSearchSchema = Yup.object().shape({
    search_category: categoryValidate,
    Search_validate: searchValidate,
});

export default HomeSearchSchema;
