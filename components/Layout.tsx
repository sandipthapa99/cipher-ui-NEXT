import {
    faBell,
    faObjectsColumn,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Box, Navbar, ScrollArea } from "@mantine/core";
import { useUser } from "hooks/auth/useUser";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import useUserStore from "store/use-user-store";
import type { MetaDataProps } from "types/metaData";
import type { User } from "types/user";

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
    const cipherOgImage = "";
    const [sidebar, setSidebarOpened] = useState(false);
    // const router = useRouter();
    // const checkPolicyPage =
    //     router.pathname !== "/privacy-policy" &&
    //     router.pathname !== "/terms-and-conditions" &&
    //     router.pathname !== "/cookies-policy";
    // ("");

    useEffect(() => {
        if (sidebar) {
            document?.querySelector("body")?.classList?.add("overflow-hidden");
        } else {
            document
                ?.querySelector("body")
                ?.classList?.remove("overflow-hidden");
        }
    }, [sidebar]);

    let userdata!: User;
    // if (typeof window !== "undefined") {
    //     const userJson = localStorage.getItem("user");
    //     if (userJson) {
    //         const res = JSON.parse(userJson);
    //         userdata = res.data;
    //     }
    // }

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
            <main className="main">
                <section id="header-section" className="sticky-wrapper-header">
                    {<UpperHeader />}
                    <Header />
                    {userdata?.is_suspended && (
                        <Alert color="orange" sx={{ zIndex: -1 }}>
                            <Container className="px-5">
                                <span className="text-danger font-weight-bold">
                                    Account Suspended !{" "}
                                </span>
                                Your account was Suspended. For more information{" "}
                                <Link href={"/support"}>
                                    <a>Contact us</a>
                                </Link>
                            </Container>
                        </Alert>
                    )}
                </section>

                {children}
            </main>
            <Footer />
            {<MobileNav getSide={setSidebarOpened} />}

            <div className={`sidebar-nav ${sidebar ? "active" : ""}`}>
                {sidebar && (
                    <Navbar height={"100vh"} p="xs" width={{ base: 270 }}>
                        <Navbar.Section>
                            <Box
                                className="pb-0"
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
                                            src="/logo/homaale-logo_svg.svg"
                                            alt="Logo"
                                            width={120}
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
                                <div className="d-flex align-items-center gap-4 text-icon">
                                    <FontAwesomeIcon
                                        icon={faObjectsColumn}
                                        className="side-bar-icon"
                                    />
                                    <Link href="/category">
                                        <p>Categories</p>
                                    </Link>
                                </div>
                            </div>
                            {/* </UnstyledButton> */}
                        </Navbar.Section>
                        {/* <Navbar.Section>
        <p className="m-0">Copyrights CIPHER</p>
    </Navbar.Section> */}
                    </Navbar>
                )}
            </div>
        </>
    );
};

export default Layout;
