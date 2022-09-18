export interface BankDetailProps {
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
