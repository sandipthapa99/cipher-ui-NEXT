export interface KYCFormProps {
    fullName: string;
    identityType: string;
    identityNumber: string;
    issuedFrom: string | null;
    issuedDate: string | null;
    expiryDate: string | null;
    identityCard: any[];
    panNumber: string;
    issuedLoaction: string;
    panIssuedDate: string;
    panPhoto: any[];
    passwordPhoto: any[];
    addressVerifiactionDocument: any[];
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: string;
}
