import { AddSkillFormData } from "utils/formData";
import { addServiceFormSchema } from "utils/formValidation/addServiceFormValidation";

export interface AccountValueProps {
    full_name: string;
    phone: number | string;
    email: string;
    bio: string;
    gender: string;
    date_of_birth: string | null;
    skill: string;
    experience_level: string;
    active_hour_start: string;
    active_hour_end: string | null;
    hourly_rate: number | null;
    user_type: string;
    country: string | number;
    address_line1: string;
    address_line2: string;
    language: string | number;
    charge_currency: string | number | undefined;
    profile_visibility: string;
    task_preferences: string;
    profile_image?: string;
    education: string;
}
