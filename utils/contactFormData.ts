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
    subject: "",
    feedback_category: 1,
    description: "",
};
export const SupportFormData: SupportValuesProps = {
    full_name: "",
    email: "",
    phone: "",
    type: "",
    reason: "",
};
export const FaqFormData: FaqValuesProps = {
    full_name: "",
    email: "",
    phone: "",
    message: "",
};
