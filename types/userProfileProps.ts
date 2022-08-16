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
}
