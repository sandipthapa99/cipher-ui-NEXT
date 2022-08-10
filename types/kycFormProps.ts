export interface KYCFormProps {
    full_name: string;
    identity_type: string;
    identity_id: string;
    identity_issued_date: string;
    identity_issuer_organization: string | null;
    identity_valid_through: string;
    identity_card_file: string | null;
    pan_number: number | null;
    pan_issued_from: string;
    pan_issued_date: string;
    pan_card_file: string | null;
    passport_size_photo: null | string;
    personal_address_verification_document: string | null;
    bank_name: string;
    bank_account_name: string;
    bank_account_number: string;
}
