import * as Yup from "yup";

let hourlyRateValidate, messageValidate;

messageValidate = Yup.string().required("Required field");
hourlyRateValidate = Yup.number().required("Required field");

export const collaborationRequestFormSchema = Yup.object().shape({
    hourly_rate: hourlyRateValidate,
    message: messageValidate,
});
