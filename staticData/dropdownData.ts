export const DUMMY_MENU_ITEMS = [
    {
        id: "0",
        name: "Accounting",
        subMenu: [
            `Book Keeping`,
            `Tax Acountants`,
            `Tax Advisior`,
            `Forensic Accounting`,
            `Pension Advisor`,
            `Mortgage Advisor`,
        ],
    },
    {
        id: "1",
        name: "Cleaning",
        subMenu: [
            `Dust Cleaning`,
            `Floor Cleaning`,
            `Dry Cleaning`,
            `Mopping`,
            `Kitchen Cleaning`,
        ],
    },
    {
        id: "2",
        name: "Beauty",
        subMenu: [
            `Eyebrow Threading`,
            `Eyebrow Waxing`,
            `Eyebrow Waxing`,
            `Manicure`,
            `Pedicure`,
        ],
    },
    {
        id: "3",
        name: "Cooking",
        subMenu: [`Pastry Chef`, `Sushi Chef`, `Home Chef`, `Private Chef`],
    },
    {
        id: "4",
        name: "Business",
        subMenu: [
            `Business Plans`,
            `Business Consultant`,
            `Business Advisory`,
            `Planning Consultant`,
            `Project Management`,
        ],
    },
    {
        id: "5",
        name: "Training Classes",
        subMenu: [
            `Dust Cleaning`,
            `Floor Cleaning`,
            `Dry Cleaning`,
            `Mopping`,
            `Kitchen Cleaning`,
        ],
    },
];
export type DropdownMenu = typeof DUMMY_MENU_ITEMS[0];
export type DropdownSubMenu = DropdownMenu["subMenu"];
