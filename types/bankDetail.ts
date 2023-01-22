export interface UserBankDetails {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: UsersBank[];
}

export interface UsersBank {
    id: number;
    bank_name: BankName;
    branch_name: BranchName;
    bank_account_name: string;
    bank_account_number: string;
    is_primary: boolean;
    is_verified: boolean;
    kyc: number;
}

export interface BankName {
    id: number;
    country: Country;
    name: string;
    swift_code: string;
    is_active: boolean;
    logo: string;
}

export interface Country {
    id: number;
    name: string;
}

export interface BranchName {
    id: number;
    bank: Bank;
    name: string;
    is_active: boolean;
}

export interface Bank {
    id: number;
    country: Country2;
    name: string;
    swift_code: string;
    is_active: boolean;
}

export interface Country2 {
    id: number;
    name: string;
}

export interface BankPostDetailProps {
    bank_account_name: string;
    branch_name: string;
    bank_name: string;
    bank_account_number: string;
    is_primary: boolean;
}

export interface BankDetailProps {
    id: number;
    bank_account_name: string;
    bank_account_number: string;
    is_primary: boolean;
    kyc: number;
    bank_name: number;
    branch_name: number;
}

export interface BankNamesResult {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Result[];
}

export interface Result {
    id: number;
    country: Country;
    name: string;
    swift_code: string;
    logo: any;
    is_active: boolean;
    extra_data: ExtraData;
}

export interface Country {
    name: string;
    code: string;
}

export interface ExtraData {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

export type BankBranchResult = BankBranch[];

export interface BankBranch {
    id: number;
    is_head: boolean;
    name: string;
    address: any;
    swift_code: any;
    is_active: boolean;
    phone: string;
    bank: number;
}
