export interface User {
    id: string;
    is_active: boolean;
    is_verified: boolean;
    is_kyc_verified: boolean;
    is_suspended: boolean;
    groups: string;
    permissions: string;
    email: string;
    social_only: boolean;
    phone: string;
}
