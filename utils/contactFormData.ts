import type {
    ContactValuesProps,
    FaqValuesProps,
    FeedbackValuesProps,
    SupportValuesProps,
} from "types/contact";

export const ContactFormData: ContactValuesProps = {
    full_name: "",
    email: "",
    message: "",
};
export const FeedbackFormData: FeedbackValuesProps = {
    fullName: "",
    subject: "",
    email: "",
    message: "",
};
export const SupportFormData: SupportValuesProps = {
    full_name: "",
    email: "",
    phone: "",
    type: "",
    reason: "",
};
export const FaqFormData: FaqValuesProps = {
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
};
