export interface TaxCalculatorValueProps {
    marital_status: string;
    gender: string;
    salary: number | null;
    income_time: string;
    festival_bonus: number | null;
    allowance: number | null;
    others: number | null;
    pf: number | null;
    cit: number | null;
    life_insurance: number | null;
    medical_insurance: number | null;
}

export interface TaxResult {
    status: string;
    data: TaxTableResultData[];
    details: Details;
}

export interface TaxTableResultData {
    name: string;
    taxable_amount: number;
    tax_liability: number;
    tax_rate: string;
}

export interface Details {
    "annual gross salary": number;
    "net taxable income": number;
    "net payable tax": number;
    "tax rate": string;
    "net tax liability yearly": number;
    "net tax liability monthly": number;
}
