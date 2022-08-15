export interface CertificationValueProps {
    name: string;
    issuing_organization: string;
    description: string;
    does_expire: boolean;
    credential_id: string;
    certificate_url: string;
    issued_date: string | null;
    expire_date: string | null;
}
