import { ContactValuesProps, FeedbackValuesProps, SupportValuesProps } from "types/contact";

export const ContactFormData: ContactValuesProps={
    fullName:"",
    email: "",
    message: "",
};
export const FeedbackFormData: FeedbackValuesProps={
    fullName:"",
    subject:"",
    email: "",
    message: "",
};
export const SupportFormData: SupportValuesProps={
    fullName:"",
    email: "",
    phoneNumber:"",
    issueType: "",
    message: "",
};