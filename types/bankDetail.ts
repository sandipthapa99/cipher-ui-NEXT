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
}

export interface Country {
    id: number;
    name: string;
}

export interface BranchName {
    id: number;
    bank: Bank;
    branch_name: string;
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

export type BankNamesResult = BankNames[];

export interface BankNames {
    id: number;
    name: string;
}

export type BankBranchResult = BankBranch[];

export interface BankBranch {
    id: number;
    branch_name: string;
    is_active: boolean;
    bank: number;
}
