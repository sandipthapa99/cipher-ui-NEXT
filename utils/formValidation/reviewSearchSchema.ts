import * as Yup from "yup";

const searchValidate = Yup.mixed().oneOf(["Most Relevant", "Top", "Latest"]);

const ReviewSearchSchema = Yup.object().shape({
    search_value: searchValidate,
});

export default ReviewSearchSchema;
