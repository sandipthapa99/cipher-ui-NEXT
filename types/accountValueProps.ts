export interface AccountValueProps {
    full_name: string;
    phone: number | null;
    email: string;
    bio: string;
    gender: string;
    date_of_birth: string | null;
    skill: string;
    experience: string;
    active_hour_start: string | undefined;
    active_hour_end: string | undefined;
    hourly_rate: number;
    user_type: string;
    country: string;
    address_line1: string;
    address_line2: string;
    language: string;
    charge_currency: string;
    profile_visibility: string;
    task_preferences: string;
    // profile_image: string;
    education: string;
}
