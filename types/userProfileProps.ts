export interface UserProfileProps {
    certificationData: {
        count: number;
        next: string;
        previous: string;
        result: {
            id: number;
            name: string;
            issuing_organization: string;
            description: string;
            does_expire: boolean;
            credential_id: string;
            certificate_url: string;
            issued_date: string;
            expire_date: string;
        }[];
    };
    educationData: {
        count: number;
        next: string;
        previous: string;
        result: {
            id: number;
            school: string;
            description: string;
            degree: string;
            field_of_study: string;
            location: string;
            start_date: string;
            end_date: string;
        }[];
    };
    experienceData: {
        count: number;
        next: string;
        previous: string;
        result: {
            id: number;
            title: string;
            description: string;
            employment_type: string;
            company_name: string;
            location: string;
            currently_working: boolean;
            start_date: string;
            end_date: string;
        }[];
    };
}
