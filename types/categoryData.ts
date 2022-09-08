export const categoryData = [
    {
        id: 0,
        name: "Garden Cleaning",
    },
    {
        id: 1,
        name: "House Cleaning",
    },
    {
        id: 2,
        name: "Bike Rider",
    },
    {
        id: 3,
        name: "Plumber",
    },
    {
        id: 4,
        name: "Electrician",
    },
];
export type CategoryData = typeof categoryData[0];

export type CategoryDataProps = [
    {
        id: 0;
        category: "string";
        slug: "string";
    }
];
