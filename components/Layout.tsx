import {
    faBell,
    faRightToBracket,
    faUser,
    faUserPlus,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Group, Navbar, ScrollArea } from "@mantine/core";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import type { MetaDataProps } from "types/metaData";

import meta from "../staticData/siteMetaData.json";
import Footer from "./Footer";
import Header from "./Header";
import MobileNav from "./MobileNav";
// import HeaderForPolicy from "./HeaderForPolicy";
// import Footer from "./Footer";
// import FooterForPolicy from "./FooterForPolicy";

const UpperHeader = dynamic(() => import("./UpperHeader"), { ssr: false });

const Layout: FC<MetaDataProps> = ({
    title,
    description,
    keywords,
    ogImage,
    ogUrl,
    children,
}) => {
    const [sideBar, setSideBarOpened] = useState(false);
    const cipherOgImage = "";
    // const router = useRouter();
    // const checkPolicyPage =
    //     router.pathname !== "/privacy-policy" &&
    //     router.pathname !== "/terms-and-conditions" &&
    //     router.pathname !== "/cookies-policy";
    // ("");
    const getSideBar = (side: boolean) => {
        setSideBarOpened(side);
    };
    console.log(sideBar);
    useEffect(() => {
        if (sideBar) {
            document?.querySelector("body")?.classList?.add("overflow-hidden");
        } else {
            document
                ?.querySelector("body")
                ?.classList?.remove("overflow-hidden");
        }
    }, [sideBar]);

    return (
        <>
            <Head>
                <title>{!title ? meta.title : title}</title>
                <meta
                    name="description"
                    content={!description ? meta.description : description}
                />
                <meta
                    property="og:title"
                    content={!title ? meta.title : title}
                />
                <meta
                    property="og:description"
                    content={!description ? meta.description : description}
                />
                <meta property="og:url" content={!ogUrl ? "" : ``} />
                <meta
                    property="og:image"
                    content={!ogImage ? cipherOgImage : ogImage}
                />
                <meta name="twitter:url" content={!ogUrl ? "" : ``} />
                <meta
                    name="twitter:title"
                    content={!title ? meta.title : title}
                />
                <meta
                    name="twitter:description"
                    content={!description ? meta.description : description}
                />
                <meta
                    name="keywords"
                    content={!keywords ? meta.keywords : keywords}
                />
                <meta name="robots" content="index, follow" />
            </Head>
            <section id="header-section" className="sticky-wrapper-header">
                {!sideBar && <UpperHeader />}
                <Header />
            </section>

            {children}
            <Footer />
            <MobileNav getSide={getSideBar} />
            {sideBar && (
                <div className="sidebar-nav">
                    <Navbar height={"100vh"} p="xs" width={{ base: 270 }}>
                        <Navbar.Section>
                            <Box
                                sx={(theme) => ({
                                    paddingLeft: theme.spacing.xs,
                                    paddingRight: theme.spacing.xs,
                                    paddingBottom: theme.spacing.lg,
                                    borderBottom: `1px solid ${
                                        theme.colorScheme === "dark"
                                            ? theme.colors.dark[4]
                                            : theme.colors.gray[2]
                                    }`,
                                })}
                            >
                                <Link href="/">
                                    <a>
                                        <Image
                                            src="/logo/logo.svg"
                                            alt="Logo"
                                            width={95}
                                            height={48}
                                            priority
                                        />
                                    </a>
                                </Link>
                            </Box>
                        </Navbar.Section>
                        <Navbar.Section
                            grow
                            mt="md"
                            component={ScrollArea}
                            mx="-xs"
                            px="xs"
                        >
                            {/* <UnstyledButton
                                sx={(theme) => ({
                                    display: "block",
                                    width: "100%",
                                    padding: theme.spacing.xs,
                                    borderRadius: theme.radius.sm,
                                    color:
                                        theme.colorScheme === "dark"
                                            ? theme.colors.dark[0]
                                            : theme.black,

                                    "&:hover": {
                                        backgroundColor:
                                            theme.colorScheme === "dark"
                                                ? theme.colors.dark[6]
                                                : theme.colors.gray[0],
                                    },
                                })}
                            > */}
                            <div className="all-sidebar-items">
                                <div className="d-flex align-items-center gap-4 text-icon">
                                    <FontAwesomeIcon
                                        icon={faRightToBracket}
                                        className="side-bar-icon"
                                    />
                                    <Link href="/login">
                                        <p>Login</p>
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center gap-4 text-icon">
                                    <FontAwesomeIcon
                                        icon={faUserPlus}
                                        className="side-bar-icon"
                                    />
                                    <Link href="/sign-up">
                                        <p>Sign-up</p>
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center gap-4 text-icon">
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        className="side-bar-icon"
                                    />
                                    <Link href="/how-it-works">
                                        <p>How it works</p>
                                    </Link>
                                </div>
                                <div className="d-flex align-items-center gap-4 text-icon">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="side-bar-icon"
                                    />
                                    <Link href="/resources">
                                        <p>Resources</p>
                                    </Link>
                                </div>
                            </div>
                            {/* </UnstyledButton> */}
                        </Navbar.Section>
                        {/* <Navbar.Section>
                            <p className="m-0">Copyrights CIPHER</p>
                        </Navbar.Section> */}
                    </Navbar>
                </div>
            )}
        </>
    );
};

export default Layout;
