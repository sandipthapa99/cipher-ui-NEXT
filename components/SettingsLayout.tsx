import {
    faBell,
    faFileInvoiceDollar,
    faGlobe,
    faKey,
    faLifeRing,
    faLinkSimple,
    faUser,
    faUserTag,
    faXmark,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

import Layout from "./Layout";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const isRouteActive = (pathname: string) =>
        router.asPath === pathname ? "active" : "";

    return (
        <Layout title="Settings" description="User profile settings">
            <section className="account-settings" id="account-settings">
                <Container>
                    <Row>
                        <Col md={3}>
                            <Nav>
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
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    className="svg-icon"
                                                />
                                                Account
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
                                                <FontAwesomeIcon
                                                    icon={faKey}
                                                    className="svg-icon"
                                                />
                                                Password & Security
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
                                                <FontAwesomeIcon
                                                    icon={faUserTag}
                                                    className="svg-icon"
                                                />
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
                                                <FontAwesomeIcon
                                                    icon={faLinkSimple}
                                                    className="svg-icon"
                                                />
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
                                                <FontAwesomeIcon
                                                    icon={faBell}
                                                    className="svg-icon"
                                                />
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
                                                <FontAwesomeIcon
                                                    icon={faGlobe}
                                                    className="svg-icon"
                                                />
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
                                                <FontAwesomeIcon
                                                    icon={faFileInvoiceDollar}
                                                    className="svg-icon"
                                                />
                                                Billing & Payments
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={""}>
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/connectedAccount"
                                                )}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faLifeRing}
                                                    className="svg-icon"
                                                />
                                                Help & Legal
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={""}>
                                            <a
                                                className={isRouteActive(
                                                    "/settings/account/connectedAccount"
                                                )}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className="svg-icon"
                                                />
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
