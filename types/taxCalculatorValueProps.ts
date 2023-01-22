export interface TaxCalculatorValueProps {
    marital_status: string;
    gender: string;
    salary: number | null | string;
    income_time: string;
    festival_bonus: number | null | string;
    allowance: number | null | string;
    others: number | null | string;
    pf: number | null | string;
    cit: number | null | string;
    life_insurance: number | null | string;
    medical_insurance: number | null | string;
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
