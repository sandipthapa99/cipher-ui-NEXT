export interface AccountValueProps {
    fullName: string;
    email: string;
    bio: string;
    gender: string;
    dateOfBirth: string | null;
    //Profession Information
    specialities: string;
    experienceLevel: string;
    activeHoursFrom: string;
    activeHoursTo: string | null;
    baseRatePerHour: string | null;
    userType: string;
    //Address Information
    country: string;
    addressLine1: string;
    addressLine2: string;
    language: string;
    currency: string;
    //Profile Configurations
    visibility: string;
    taskPreferences: string;
}
