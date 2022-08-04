import { useEffect, useState } from "react";
import { axiosClient } from "utils/axiosClient";

export const services = [
    {
        id: "0",
        serviceImage: "/services/s1.png",
        serviceTitle: "Harry Plumbing Service",
        serviceProvider: "Harry Smith",
        serviceProviderLocation: "Baneshwor, KTM",
        serviceDescription:
            "Gardener responsibilities include monitoring the health of all the planets",
        serviceRating: "4.8(200)",
        servicePrice: "50",
        hasOffer: true,
        discountRate: 20,
    },
    {
        id: "1",
        serviceImage: "/services/s2.png",
        serviceTitle: "House Cleaner",
        serviceProvider: "Harry Smith",
        serviceProviderLocation: "Baneshwor, KTM",
        serviceDescription:
            "Gardener responsibilities include monitoring the health of all the planets",
        serviceRating: "4.8(200)",
        servicePrice: "50",
        hasOffer: false,
    },
    {
        id: "2",
        serviceImage: "/services/s3.png",
        serviceTitle: "Home Tution",
        serviceProvider: "Harry Smith",
        serviceProviderLocation: "Baneshwor, KTM",
        serviceDescription:
            "Gardener responsibilities include monitoring the health of all the planets",
        serviceRating: "4.8(200)",
        servicePrice: "50",
        hasOffer: false,
    },
    {
        id: "3",
        serviceImage: "/services/s4.png",
        serviceTitle: "Training Classes",
        serviceProvider: "Harry Smith",
        serviceProviderLocation: "Baneshwor, KTM",
        serviceDescription:
            "Gardener responsibilities include monitoring the health of all the planets",
        serviceRating: "4.8(200)",
        servicePrice: "50",
        hasOffer: true,
        discountRate: 20,
        discountOn: "On Service Charges",
    },
];

export const ServicesItemClient = () => {
    const [servicesItem, setServicesItem] = useState<typeof services>(services);
    // const service = axiosClient.get(`/searchCategory`);

    useEffect(() => {
        setServicesItem(servicesItem);
    }, [servicesItem]);

    return servicesItem;
};
