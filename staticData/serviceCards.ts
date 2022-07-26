import { randNumber } from "utils/randNumber";

export const generateServiceCards = (length = 3) => {
    return Array.from({ length })
        .map((_, index) => index)
        .map((index) => ({
            serviceImage: "https://thispersondoesnotexist.com/image",
            serviceTitle: `Service ${index}`,
            serviceProvider: `Service provider ${index}`,
            serviceProviderLocation: `Service provider location ${index}`,
            serviceDescription: `Service description ${index}`,
            serviceRating: randNumber(5).toString(),
            servicePrice: randNumber(10000).toString(),
            hasOffer: Math.random() > 0.5,
            discountRate: randNumber(10),
            discountOn: `Discount on ${index}`,
        }));
};

export const serviceCards = generateServiceCards();

export type ServiceCard = ReturnType<typeof generateServiceCards>;
