import {
    faBoxOpen,
    faCar,
    faChartSimpleHorizontal,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import React from "react";

import { useProfileModelStyles } from "./profileModelStyles";

const PROFILE_LINKS = {
    sectionOne: [
        {
            title: "Overview",
            icon: <FontAwesomeIcon icon={faChartSimpleHorizontal} />,
            href: "/overview",
            color: "#495057",
        },
        {
            title: "My Orders",
            icon: <FontAwesomeIcon icon={faBoxOpen} />,
            href: "/myorders",
            color: "#495057",
        },
        {
            title: "Payment History",
            icon: "/userprofile/paymenthistory.svg",
            href: "/payment-history",
            color: "#495057",
        },
        {
            title: "Redeem",
            icon: "/userprofile/redeem.svg",
            href: "/redeem",
            color: "#F98900",
        },
    ],
    sectionTwo: [
        {
            title: "Switch to i am the...",
            icon: "/userprofile/switch.svg",
            href: "/switch",
            color: "#495057",
        },
    ],
    sectionThree: [
        {
            title: "My Dashboard",
            icon: "/userprofile/mydashboard.svg",
            href: "/my-dashboard",
            color: "#495057",
        },
        {
            title: "Settings",
            icon: "/userprofile/settings.svg",
            href: "/settings/account/individual",
            color: "#495057",
        },
    ],
    sectionFour: [
        {
            title: "Logout",
            icon: "/userprofile/logout.svg",
            href: "/logout",
            color: "#495057",
        },
    ],
};
export const ExperimentalProfileModel = () => {
    const { classes } = useProfileModelStyles();
    const renderProfileSections = () => {
        return Object.entries(PROFILE_LINKS).map((entry) => {
            const [key, value] = entry;
            return (
                <ul className={classes.bodyItem} key={key}>
                    <Divider my="1rem" />
                    {value.map((item, key) => (
                        <li key={key}>
                            <FontAwesomeIcon icon={faCar} color={item.color} />
                            <NextLink
                                style={{ color: item.color }}
                                href={item.href}
                            >
                                {item.title}
                            </NextLink>
                        </li>
                    ))}
                </ul>
            );
        });
    };
    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Image
                    src="/userprofile/profile.svg"
                    width={40}
                    height={40}
                    alt="Profile Image"
                />
                <div>
                    <Text className={classes.username}>Harry Smith</Text>
                    <Text className={classes.profileType}>Individual</Text>
                </div>
                <Image
                    src="/userprofile/badge.png"
                    width={60}
                    height={60}
                    alt="Badge"
                />
            </div>
            <div className={classes.body}>{renderProfileSections()}</div>
        </div>
    );
};
