import {
    faArrowRightFromBracket,
    faGear,
    faGift,
    faSackDollar,
    faTicket,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Divider, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import {
    AccountCircleOutlined,
    Dashboard,
    GridViewOutlined,
} from "@mui/icons-material";
import { useLogout } from "hooks/auth/useLogout";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { useProfileModelStyles } from "./profileModelStyles";

const REGULAR_ICON_COLOR = "#495057";
const SPECIAL_ICON_COLOR = "#F98900";

export const ProfileModel = () => {
    const router = useRouter();
    const { classes } = useProfileModelStyles();
    const { data: profileDetails } = useGetProfile();

    const logout = useLogout({
        onLogout: () => {
            if (router.pathname === "/") return;
            router.push({
                pathname: "/login",
                query: { next: router.asPath },
            });
            // remove();
        },
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
                        >
                            {/* <FontAwesomeIcon icon={faCar} color={item.color} /> */}
                            {item.icon}
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
                <Avatar
                    src={
                        profileDetails?.profile_image
                            ? profileDetails?.profile_image
                            : profileDetails?.avatar?.image
                    }
                    radius="xl"
                    size={44}
                    alt="it's me"
                />
                <div>
                    <Text className={classes.username}>
                        {profileDetails
                            ? `${profileDetails.user?.first_name} ${
                                  profileDetails.user?.middle_name ?? ""
                              } ${profileDetails.user?.last_name}`
                            : "Hello User"}
                    </Text>
                    <Text className={classes.profileType}>
                        {profileDetails && profileDetails?.profile_visibility}
                    </Text>
                </div>
                <Image
                    src={
                        profileDetails?.badge?.image
                            ? profileDetails?.badge?.image
                            : "/userprofile/badge.png"
                    }
                    width={45}
                    height={45}
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
            icon: <GridViewOutlined style={{ color: REGULAR_ICON_COLOR }} />,
            href: "/home",
            color: "#495057",
        },
        {
            title: "Profile",
            icon: (
                <AccountCircleOutlined style={{ color: REGULAR_ICON_COLOR }} />
            ),
            href: "/profile",
            color: "#495057",
        },
        {
            title: "My Earnings",
            icon: (
                <FontAwesomeIcon
                    color={REGULAR_ICON_COLOR}
                    icon={faSackDollar}
                />
            ),
            href: "/my-Earnings",
            color: "#495057",
        },
        {
            title: "My Tickets",
            icon: (
                <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faTicket} />
            ),
            href: "/my-tickets",
            color: "#495057",
        },

        {
            title: "Offers",
            icon: <FontAwesomeIcon color={SPECIAL_ICON_COLOR} icon={faGift} />,
            href: "/offers",
            color: "#F98900",
        },
    ],
    //sectionTwo: [
    //    {
    //        title: "Switch to i am the...",
    //        icon: (
    //            <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faRepeat} />
    //        ),
    //        href: "/switch",
    //        color: "#495057",
    //    },
    //],
    sectionThree: [
        {
            title: "Settings",
            icon: <FontAwesomeIcon color={REGULAR_ICON_COLOR} icon={faGear} />,
            href: "/settings/account/individual",
            color: "#495057",
        },
    ],
};
