export interface CertificationValueProps {
    name: string;
    organization: string;
    description: string;
    toggle: boolean;
    credentialId: string;
    certificateURL: string;
    issuedDate: string | null;
    expirationDate: string | null;
}
