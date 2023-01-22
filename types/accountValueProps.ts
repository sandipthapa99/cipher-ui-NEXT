export interface AccountValueProps {
    first_name: string;
    middle_name: string;
    last_name: string;
    city: string;
    email: string;
    bio: string;
    gender: string;
    date_of_birth: string | number | Date;
    skill: any;
    interests: {
        label: string;
        value: string;
    }[];
    experience_level: string;
    active_hour_start: string;
    active_hour_end: string | null;
    hourly_rate: number | null | string;
    user_type: string;
    country: string | number;
    address_line1: string;
    address_line2: string;
    language: string | number;
    charge_currency: string | number | undefined;
    profile_visibility: string;
    task_preferences: string;
    profile_image: string | Blob;
    designation: string;
}
