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
import type { ReactNode } from "react";
import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

import Layout from "./Layout";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
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
                                            <a>
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
                                            <a>
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
                                            <a>
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
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faLinkSimple}
                                                    className="svg-icon"
                                                />
                                                Connected Account
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={""}>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faBell}
                                                    className="svg-icon"
                                                />
                                                Notifications
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={""}>
                                            <a>
                                                <FontAwesomeIcon
                                                    icon={faGlobe}
                                                    className="svg-icon"
                                                />
                                                Languages
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={""}>
                                            <a>
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
                                            <a>
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
                                            <a>
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
