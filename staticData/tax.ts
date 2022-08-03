export const taxDeductionSteps = [
    "Calculate gross monthly income as a sum of basic income, allowances and perquisites.",
    "Calculate available exemptions under Section 10 of the Income Tax Act (ITA). Exemptions are applicable on allowances such as medical, HRA, travel.",
    "Reduce exemptions according to step (2) for the gross monthly income calculated in step (1).",
    "As TDS is calculated on yearly income, multiply the corresponding figure from above calculation by 12. This is your yearly taxable income from salary.",
    "If you have any other income source such as income from house rent or have incurred losses from paying housing loan interests, add/subtract this amount from the figure in step (4).",
    "Next, calculate your investments for the year which fall under Chapter VI-A of ITA, and deduct this amount from the gross income calculated in step (5). An example of this would be exemption of up to Rs.1.5 lakh under Section 80C, which includes investment avenues such as PPF, life insurance premiums, mutual funds, home loan repayment, ELSS, NSC, Sukanya Samriddhi account and so on.",
    "Now, reduce the maximum allowable income tax exemptions on a salary. Currently, income up to Rs.2.5 lakhs is fully exempt from paying taxes, while income from Rs.2.5 lakhs to Rs.5 lakhs is taxed at 10%, and Rs.5 lakhs to Rs.10 lakhs income bracket is taxed at 20%. All income above this amount is taxed at 30%.",
    "Do note that senior citizen have different tax slabs and receive higher exemptions than those discussed above.",
];

export const exampleSteps = [
    {
        id: "0",
        name: "Steps(1) & (2)",
        description:
            "Suppose your monthly gross income is Rs.80,000. This figure may contain divisions as - basic pay Rs.50,000, HRA of Rs.20,000, travel allowance of Rs.800, medical allowance of Rs.1,250, child education allowance (CEA) of Rs.200 and other allowances totalling 12,750.",
    },
    {
        id: "1",
        name: "Steps(3) & (4)",
        description:
            "Assuming that you stay at your own property, your monthly exemption from allowances equals Rs.2,250 (medical + travel + CEA). Therefore, your yearly taxable amount comes to (Rs.80,000 - Rs.2,250)*12, which comes to Rs.9,33,000.",
    },
    {
        id: "2",
        name: "Steps(5)",
        description:
            "Let's say you just experienced a loss of Rs.1.5 lakhs on house loan interest repayments over the year. Reducing this exempted amount from the taxable income, your taxable income becomes Rs.7,83,000.",
    },
    {
        id: "3",
        name: "Steps(6)",
        description:
            "Suppose you have invested Rs.1.2 lakhs in various categories that fall under Section 80C exemptions, and made another Rs.30,000 investment in categories falling under Section 80D. So, the resulting Rs.1.5 lakhs is exempted from taxes according to Chapter VI-A. Deducting this amount from the gross taxable income calculated above, your taxable income becomes Rs.6,33,000.",
    },
];

export const taxDeductionSlab = [
    {
        id: "0",
        heading: [
            {
                id: "0",
                name: "Income Tax Slab",
            },
            {
                id: "1",
                name: "TDS Deductions",
            },
            {
                id: "2",
                name: "Tax Payable",
            },
        ],
        data: [
            {
                id: "0",
                taxSlab: "Rs.2.5 lakhs to Rs 5 lakhs",
                tdsDeduction: "Nil",
                taxPayable: "Rs.2.5 lakhs to Rs 5 lakhs",
            },
            {
                id: "1",
                taxSlab: "Rs.5 lakhs to Rs 6.33 lakhs",
                tdsDeduction: "10% of(Rs5,00,00-Rs.2,50,00)",
                taxPayable: "Rs.25,00",
            },
            {
                id: "2",
                taxSlab: "Up to Rs.2.5 lakhs",
                tdsDeduction: "20% of(Rs.6,33,00-Rs 5,00,00)",
                taxPayable: "Rs.26,600",
            },
        ],
    },
];

export const taxRegime = [
    {
        id: "0",
        heading: [
            {
                id: "0",
                name: "Income Tax Slab",
            },
            {
                id: "1",
                name: "New Tax Rate",
            },
        ],
        data: [
            {
                id: "0",
                taxSlab: "Rs.2.5 lakhs to Rs 5 lakhs",
                taxRate: "Nil",
            },
            {
                id: "1",
                taxSlab: "From Rs.2,50,001 to Rs.5 lakh",
                taxRate:
                    "5% of the total income that is more than Rs.2.5 lakh + 4% cess",
            },
            {
                id: "2",
                taxSlab: "From Rs.5,00,001 to Rs.7.5 lakh",
                taxRate:
                    "10% of the total income that is more than Rs.5 lakh + 4% cess",
            },
            {
                id: "3",
                taxSlab: "From Rs.7,50,001 to Rs.10 lakh",
                taxRate:
                    "15% of the total income that is more than Rs.7.5 lakh + 4% cess",
            },
            {
                id: "4",
                taxSlab: "From Rs.10,00,001 to Rs.12.50 lakh",
                taxRate:
                    "20% of the total income that is more than Rs.10 lakh + 4% cess",
            },
            {
                id: "5",
                taxSlab: "From Rs.12,50,001 to Rs.15 lakh",
                taxRate:
                    "20% of the total income that is more than Rs.10 lakh + 4% cess",
            },
            {
                id: "6",
                taxSlab: "Income above Rs.15,00,001",
                taxRate:
                    "30% of the total income that is more than Rs.15 lakh + 4% cess",
            },
        ],
    },
];
