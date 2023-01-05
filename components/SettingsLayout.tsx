import {
    BadgeOutlined,
    CancelOutlined,
    KeyOutlined,
    LanguageOutlined,
    LinkOutlined,
    NotificationsOutlined,
    PersonOutlined,
    RequestQuoteOutlined,
    SupportOutlined,
} from "@mui/icons-material";
import { width } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

import Layout from "./Layout";

const SettingsLayout = ({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) => {
    const router = useRouter();

    const isRouteActive = (pathname: string) =>
        router.asPath === pathname ? "active" : "";

    return (
        <Layout
            title={title}
            description="User profile settings"
            keywords="homaale-settings, homaale"
        >
            <section className="account-settings" id="account-settings">
                <Container fluid="xl">
                    <Row>
                        <Col md={3}>
                            <Nav className="sticky-wrapper">
                                <ul>
                                    <li>
                                        <Link
                                            href={
                                                "/settings/account/individual"
                                            }
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/individual"
                                                )}
                                            >
                                                <PersonOutlined className="svg-icon" />
                                                Account Settings
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={"/settings/account/security"}
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/security"
                                                )}
                                            >
                                                <KeyOutlined className="svg-icon" />
                                                Security
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                "/settings/account/membership"
                                            }
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/membership"
                                                )}
                                            >
                                                <BadgeOutlined className="svg-icon" />
                                                Membership
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                "/settings/account/connectedAccount"
                                            }
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/connectedAccount"
                                                )}
                                            >
                                                <LinkOutlined className="svg-icon" />
                                                Connected Account
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                "/settings/account/notification"
                                            }
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/notification"
                                                )}
                                            >
                                                <NotificationsOutlined className="svg-icon" />
                                                Notifications
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={"/settings/account/languages"}
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/languages"
                                                )}
                                            >
                                                <LanguageOutlined className="svg-icon" />
                                                Languages
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={"/settings/account/payment"}
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/payment"
                                                )}
                                            >
                                                <RequestQuoteOutlined className="svg-icon" />
                                                Billing & Payments
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/settings/account/help"}>
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/help"
                                                )}
                                            >
                                                <SupportOutlined className="svg-icon" />
                                                Help & Legal
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={
                                                "/settings/account/deactivate"
                                            }
                                        >
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/deactivate"
                                                )}
                                            >
                                                <CancelOutlined className="svg-icon" />
                                                Deactivate
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </Nav>
                        </Col>
                        <Col md={9}>{children}</Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default SettingsLayout;
