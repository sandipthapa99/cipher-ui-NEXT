export const creditCardContent = [
    {
        id: "0",
        number: "xxxx xxxx xxxx8845",
        name: "Harry Smith",
        expDate: "10/24",
        cvv: "486",
        isDefault: true,
    },
    {
        id: "1",
        number: "xxxx xxxx xxxx8855",
        name: "Harry Potter",
        expDate: "10/24",
        cvv: "486",
        isDefault: false,
    },
];
export type CreditCardContent = typeof creditCardContent[0];
