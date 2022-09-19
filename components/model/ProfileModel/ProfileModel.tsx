import {
    faArrowRightFromBracket,
    faChartSimpleHorizontal,
    faGauge,
    faGear,
    faGift,
    faRepeat,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Divider, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useLogout } from "hooks/auth/useLogout";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { useRouter } from "next/router";
import defaultProfile from "public/default.png";
import React from "react";

import { useProfileModelStyles } from "./profileModelStyles";

const REGULAR_ICON_COLOR = "#495057";
const SPECIAL_ICON_COLOR = "#F98900";

export const ProfileModel = () => {
    const router = useRouter();
    const { classes } = useProfileModelStyles();
    const { data: profileDetails, isLoading } = useGetProfile();

    const logout = useLogout({
        onLogout: () =>
            router.push({
                pathname: "/login",
                query: { next: router.pathname },
            }),
    });

    const renderProfileSections = () => {
        return Object.entries(PROFILE_LINKS).map((entry) => {
            const [key, value] = entry;
            return (
                <ul className={classes.bodyItem} key={key}>
                    <Divider my="1rem" />
                    {value.map((item, key) => (
                        <li
                            data-is-active={router.pathname === item.href}
                            key={key}
                            className="menu"
                        >
                            {/* <FontAwesomeIcon icon={faCar} color={item.color} /> */}
                            {item.icon}
                            <NextLink
                                style={{ color: item.color }}
                                href={item.href}
                                className="menu-link"
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
                {isLoading ? (
                    <Avatar
                        src={defaultProfile.src}
                        radius="xl"
                        size={44}
                        alt="it's me"
                    />
                ) : (
                    <Avatar
                        src={profileDetails?.profile_image}
                        radius="xl"
                        size={44}
                        alt="it's me"
                    />
                )}
                <div>
                    <Text className={classes.username}>
                        {profileDetails
                            ? `${profileDetails.full_name}`
                            : "Howdy User"}
                    </Text>
                    <Text className={classes.profileType}>
                        {profileDetails && profileDetails?.profile_visibility}
                    </Text>
                </div>
                <Image
                    src="/userprofile/badge.png"
                    width={60}
                    height={60}
                    alt="Badge"
                />
            </div>
            <div className={classes.body}>
                {renderProfileSections()}
                <ul>
                    <Divider my="1rem" />
                    <li>
                        <Button
                            sx={{ fontWeight: 500 }}
                            color={"red"}
                            variant="white"
                            leftIcon={
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                />
                            }
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    );
};
const PROFILE_LINKS = {
    sectionOne: [
        {
            title: "My Dashboard",
            icon: <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faGauge} />,
            href: "/home",
            color: "#495057",
        },
        {
            title: "Profile",
            icon: (
                <FontAwesomeIcon
                    color={REGULAR_ICON_COLOR}
                    icon={faChartSimpleHorizontal}
                />
            ),
            href: "/profile",
            color: "#495057",
        },
        //{
        //    title: "My Orders",
        //    icon: (
        //        <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faBoxOpen} />
        //    ),
        //    href: "/myorders",
        //    color: "#495057",
        //},
        //{
        //    title: "Payment History",
        //    icon: (
        //        <FontAwesomeIcon
        //            color={REGULAR_ICON_COLOR}
        //            icon={faFileInvoiceDollar}
        //        />
        //    ),
        //    href: "/payment-history",
        //    color: "#495057",
        //},
        {
            title: "Offers",
            icon: <FontAwesomeIcon color={SPECIAL_ICON_COLOR} icon={faGift} />,
            href: "/offers",
            color: "#F98900",
        },
        {
            title: "Settings",
            icon: <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faGear} />,
            href: "/settings/account/individual",
            color: "#495057",
        },
    ],
    sectionTwo: [
        {
            title: "Switch to i am the...",
            icon: (
                <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faRepeat} />
            ),
            href: "/switch",
            color: "#495057",
        },
    ],
    sectionThree: [
        {
            title: "Merchant DashBoard",
            icon: <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faGauge} />,
            href: "/home",
            color: "#495057",
        },
    ],
};
