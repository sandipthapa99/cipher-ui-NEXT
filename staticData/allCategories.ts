import { randNumber } from "utils/randNumber";

export const CATEGORY_TITLES = [
    "Accounting",
    "Fitness",
    "Grocery Delivery",
    "Landscaping",
    "Bathroom Renovation",
    "Cleaning",
    "Carpentry",
    "Concreting",
    "Courier Services",
    "Home and LifeStyle",
    "Models",
    "Household Chores",
    "Computers & IT",
    "Bicycle Service",
    "Carpet Cleaning",
    "Commercial Cleaning",
    "Dance Lessons",
    "Home Theatre",
    "Motorcycle Mechanic",
    "Beauticians",
    "Flooring",
    "Gift Delivery",
    "Laundry",
    "Car Body Work",
    "Chef",
    "Clearance Services",
    "Flower Delivery",
    "Interior Designers",
    "Makeup Artist",
    "Moving",
    "Business",
    "Florist",
    "Hairdressers",
    "Lawn Care",
    "Admin",
    "Car Detailing",
    "Childcare and Saftey",
    "Electronic Repair",
    "Fitness",
    "Landscaping",
    "Locksmith",
    "Chef",
    "Gardening",
    "Handyman",
    "Interior Designers",
    "Junk Removal",
    "Lessons",
    "Alterations",
    "Car Inspection",
    "Car Service",
    "Car Wash",
    "Driving",
    "Fencing",
    "Gate Installation",
    "Local Mobile Mechanic",
    "Glaziers",
    "Furniture Assembly",
    "Appliances",
    "Draftsman",
    "Electrians",
    "Entertainment",
    "Furniture Repair",
    "Marketing",
    "Coaching",
    "HVAC",
    "Health and Wellness",
    "Architects",
    "Assembly",
    "Audio Visual",
    "Bakers",
    "Barbers",
    "Delivery",
    "Design",
    "Dog Care",
    "Engraving",
    "Food Delivery",
    "Furniture Assembly",
    "Martial Arts",
];

export const ALL_CATEGORIES = Array.from(new Set(CATEGORY_TITLES)).map(
    (title) => ({
        title,
        subItems: Array.from({ length: randNumber(4, 10) })
            .map((_, index) => index)
            .map((index) => ({
                id: index,
                title: `${title} ${index}`,
                href: `/${title.toLowerCase().split(" ").join("-")}`,
            })),
    })
);
export type AllCategory = typeof ALL_CATEGORIES[0];

export const Homepage_category_titles = [
    "Accounting",
    "Fitness",
    "Grocery Delivery",
    "Landscaping",
    "Bathroom Renovation",
    "Cleaning",
    "Carpentry",
    "Concreting",
];

export const Homepage_categories = Array.from(
    new Set(Homepage_category_titles)
).map((title) => ({
    title,
    subItems: Array.from({ length: randNumber(4, 10) })
        .map((_, index) => index)
        .map((index) => ({
            id: index,
            title: `${title} ${index}`,
            href: `/${title.toLowerCase().split(" ").join("-")}`,
        })),
}));

export type HomepageCategory = typeof Homepage_categories[0];
