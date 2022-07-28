import { faBars, faBell } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { handleMenuActive } from "utils/helpers";

import { PostTaskModel } from "./model/PostTaskModel";

export function UpperHeader() {
    const router = useRouter();
    const [notopen, setNotopen] = useState(false);

    return (
        <>
            {/* Site Upper Header Start */}
            <header id="site-upper-header" className="site-upper-header">
                <Container className="">
                    <Navbar expand="lg" className="upper-navigation">
                        <Link href="/">
                            <a>
                                <Navbar.Brand>
                                    <Image
                                        src="/logo/logo.svg"
                                        alt="Logo"
                                        width={95}
                                        height={48}
                                        priority
                                    />
                                </Navbar.Brand>
                            </a>
                        </Link>
                        <Navbar.Collapse
                            className="upper-navigation--site-navigation"
                            id="upper-header-navigation"
                        >
                            <nav className="navbar-nav ms-lg-auto">
                                <li
                                    className={handleMenuActive(
                                        "/how-it-works",
                                        router
                                    )}
                                >
                                    <Link href="/discover">
                                        <a className="nav-link">How It Works</a>
                                    </Link>
                                </li>
                                <li
                                    className={handleMenuActive(
                                        "/features",
                                        router
                                    )}
                                >
                                    <Link href="/resources">
                                        <a className="nav-link">Resources</a>
                                    </Link>
                                </li>
                                <li
                                    className={handleMenuActive(
                                        "/login",
                                        router
                                    )}
                                >
                                    <Link href="/login">
                                        <a className="nav-link d-md-none d-inline-block">
                                            Log In
                                        </a>
                                    </Link>
                                </li>
                                <li
                                    className={handleMenuActive(
                                        "/signup",
                                        router
                                    )}
                                >
                                    <Link href="/signup">
                                        <a className="nav-link d-md-none d-inline-block">
                                            Sign Up
                                        </a>
                                    </Link>
                                </li>
                            </nav>
                        </Navbar.Collapse>

                        {
                            <Link href="/login">
                                <a className="btn login-btn d-none d-md-inline-block">
                                    Login
                                </a>
                            </Link>
                        }

                        {
                            <Link href="/signup">
                                <a className="btn login-btn d-none d-md-inline-block">
                                    Sign Up
                                </a>
                            </Link>
                        }
                        <div>
                            <a
                                className="btn location-btn d-none d-md-inline-block"
                                onClick={() => setNotopen(!notopen)}
                            >
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="svg-icon"
                                />
                            </a>
                            {notopen && <PostTaskModel />}
                        </div>

                        <Link href="#!">
                            <a className="btn nav-cta-btn d-none d-md-inline-block">
                                Post Task
                            </a>
                        </Link>
                        <Navbar.Toggle aria-controls="site-navigation">
                            <FontAwesomeIcon
                                icon={faBars}
                                className="svg-icon"
                            />
                        </Navbar.Toggle>
                        {/* <Button type="button" className="mega-menu-toggler">
                            <DragHandle className="svg-icon" />
                        </Button> */}
                    </Navbar>
                </Container>
            </header>
            {/* Site Upper Header End */}
        </>
    );
}

export default UpperHeader;
