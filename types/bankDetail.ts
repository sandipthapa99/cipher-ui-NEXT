export interface BankDetailProps {
    bank_account_name: string;
    address: string;
    branch_name: string;
    bank_account_number: string;
    is_primary: boolean;
}

export interface BankNamesResult {
    count: number;
    next: string;
    previous: string;
    results: BankNames[];
}

export interface BankNames {
    id: number;
    name: string;
    swift_code: string;
    is_active: boolean;
    country: number;
}

export interface BankBranchResult {
    count: number;
    next: string;
    previous: string;
    results: BankBranch[];
}

export interface BankBranch {
    id: number;
    branch_name: string;
    branch_address: string;
    branch_code: string;
    is_head_office: boolean;
    is_active: boolean;
    bank: number;
}
