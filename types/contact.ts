export interface ContactValuesProps {
    full_name: string;
    email: string;
    message: string;
}
export interface FeedbackValuesProps {
    subject: string;
    feedback_category: number;
    description: string;
}
export interface SupportValuesProps {
    full_name: string;
    email: string;
    phone: string;
    attachment: any[];
    imagePreviewUrl?: any[];
    type: string;
    reason: string;
}
export interface FaqValuesProps {
    full_name: string;
    email: string;
    phone: string;
    message: string;
    contact_us_category?: number;
}
