import { useEffect, useState } from "react";
import { axiosClient } from "utils/axiosClient";
const servicesNearYou = [
    {
        id: "0",
        serviceProvider: "Eleven",
        serviceTitle: "Learn Telepathy",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        haveDiscount: false,
        serviceRating: "4.5(200)",
        image: "/services/s1.png",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "1",
        serviceProvider: "Demogordon",
        serviceTitle: "Destroy Bugs",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "2",
        serviceProvider: "Ghachin Aryal",
        serviceTitle: "learn Coding",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",

        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "3",
        serviceProvider: "Tanjirou",
        serviceTitle: "Water form",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "4",
        serviceProvider: "Zenitsu",
        serviceTitle: "Lightening form",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "5",
        serviceProvider: "Uzumaki naruto",
        serviceTitle: "Martial arts ",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "6",
        serviceProvider: "Uchiha Itachi",
        serviceTitle: "Tax Payer",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "7",
        serviceProvider: "Eren Yaeger",
        serviceTitle: "Cleaner",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "8",
        serviceProvider: "Mikasa Ackerman",
        serviceTitle: "BodyGuard",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "9",
        serviceProvider: "Lalit Kumar",
        serviceTitle: "Garden Cleaner",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "10",
        serviceProvider: "Lalit Kumar",
        serviceTitle: "Garden Cleaner",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "11",
        serviceProvider: "Lalit Kumar",
        serviceTitle: "Ac Cleaner",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "12",
        serviceProvider: "Lalit Kumar",
        serviceTitle: "Garden Cleaner",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
    {
        id: "13",
        serviceProvider: "Lalit Kumar",
        serviceTitle: "Garden Cleaner",
        serviceProviderLocation: "Buddhanagar, Kathmandu",
        servicePrice: 123456,
        serviceRating: "4.5(200)",
        haveDiscount: true,
        discount: 20,
        image: "/services/s1.png",
        discountOn: "Service Charge",
        serviceDescription:
            "Hiring a reputable professional landscape gardenerentail paying for their knowledge, experience, time, equipment, and materials. They will be able to discuss your vision and tailor your garden design to your exact needs, taking into account your taste, lifestyle,budget. ",
    },
];

export const ServiceClient = () => {
    const [services, setServices] =
        useState<typeof servicesNearYou>(servicesNearYou);

    // const service = axiosClient.get(`/services`);
    useEffect(() => {
        setServices(servicesNearYou);
    }, []);

    return services;
};
