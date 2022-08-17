export interface KYCFormProps {
    full_name: string;
    identity_type: string;
    identity_id: string;
    identity_issued_date: string | null;
    identity_valid_through: string | null;
    identity_issuer_organization: string;
    identity_card_file: string;
    pan_number: number | null;
    pan_issued_from: string;
    pan_issued_date: string;
    pan_card_file: string;
    passport_size_photo: string;
    personal_address_verification_document: string;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
}
