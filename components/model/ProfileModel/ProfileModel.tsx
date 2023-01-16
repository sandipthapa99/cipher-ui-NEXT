import { Avatar, Button, Divider, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import {
    AccountCircleOutlined,
    ConfirmationNumberOutlined,
    GridViewOutlined,
    LogoutOutlined,
    RedeemOutlined,
    SavingsOutlined,
    SettingsOutlined,
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
            <div id="backdrop" className="backdrop-blur"></div>
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
                            sx={{ fontWeight: 500, padding: 0 }}
                            color={"red"}
                            variant="white"
                            leftIcon={
                                <LogoutOutlined style={{ fontSize: "2rem" }} />
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
            icon: <SavingsOutlined style={{ color: REGULAR_ICON_COLOR }} />,
            href: "/my-Earnings",
            color: "#495057",
        },
        {
            title: "My Tickets",
            icon: (
                <ConfirmationNumberOutlined
                    style={{ color: REGULAR_ICON_COLOR }}
                />
            ),
            href: "/my-tickets",
            color: "#495057",
        },

        {
            title: "Offers",
            icon: <RedeemOutlined style={{ color: SPECIAL_ICON_COLOR }} />,
            href: "/offers",
            color: "#F98900",
        },
    ],
    sectionThree: [
        {
            title: "Settings",
            icon: <SettingsOutlined style={{ color: REGULAR_ICON_COLOR }} />,
            href: "/settings/account/individual",
            color: "#495057",
        },
    ],
};
