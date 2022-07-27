import {
    faAngleDown,
    faBars,
    faListCheck,
    faLocationDot,
    faObjectsColumn,
    faTelescope,
    faBell,
} from "@fortawesome/pro-regular-svg-icons";
import { faUserHelmetSafety } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { handleMenuActive } from "utils/helpers";

// import { handleMenuActive } from "../../../../libs/util-formatter/src";
import { Dropdown } from "./common/Dropdown";
import { NotificationDropdown } from "./notifications/NotificationDropdown";
const Header = () => {
    const router = useRouter();
    const [notopen, setNotopen] = useState(false);

    const [stickyClass, setStickyClass] = useState("relative");
    useEffect(() => {
        window.addEventListener("scroll", stickNavbar);

        return () => {
            window.removeEventListener("scroll", stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            const windowHeight = window.scrollY;
            windowHeight > 85
                ? setStickyClass("sticky")
                : setStickyClass("normal");
        }
    };

    return (
        <>
            {/* Site Upper Header Start */}
            <header id="site-header" className={`site-header ${stickyClass}`}>
                <Container className="">
                    <Navbar expand="lg" className="header-navigation">
                        <nav className="navbar-nav ms-lg-auto">
                            <li
                                className={handleMenuActive("/explore", router)}
                            >
                                <Link href="/explore">
                                    <a className="nav-link">
                                        <FontAwesomeIcon
                                            icon={faTelescope}
                                            className="svg-icon d-none d-sm-inline-block"
                                        />
                                        Explore Services
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={handleMenuActive(
                                    "/features",
                                    router
                                )}
                            >
                                <Link href="/resources">
                                    <a className="nav-link">
                                        <FontAwesomeIcon
                                            icon={faListCheck}
                                            className="svg-icon d-none d-sm-inline-block"
                                        />
                                        Find Tasks
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={handleMenuActive(
                                    "/features",
                                    router
                                )}
                            >
                                <Link href="/resources">
                                    <a className="nav-link">
                                        <FontAwesomeIcon
                                            icon={faUserHelmetSafety}
                                            className="svg-icon d-none d-sm-inline-block"
                                        />
                                        Find Merchants
                                    </a>
                                </Link>
                            </li>
                            <Dropdown>
                                <li
                                    className={handleMenuActive(
                                        "/features",
                                        router
                                    )}
                                >
                                    <Link href="">
                                        <a
                                            className="nav-link d-none d-md-inline-block"
                                            style={{
                                                paddingRight: "3rem !important",
                                                paddingLeft: "4rem !important",
                                                alignItems: "center",
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faObjectsColumn}
                                                className="svg-icon"
                                            />
                                            Categories
                                            <FontAwesomeIcon
                                                icon={faAngleDown}
                                                className="faAngleDown-svg-icon"
                                            />
                                        </a>
                                    </Link>
                                </li>
                            </Dropdown>
                        </nav>

                        <Link href="#!">
                            <a className="btn location-btn d-none d-md-inline-block">
                                Nepal
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="svg-icon"
                                />
                            </a>
                        </Link>

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
                            {notopen && <NotificationDropdown />}
                        </div>

                        {/* <div className="notification-dropdown-icon">
                            <a
                                className="btn notification-button d-none d-md-inline-block"
                                onClick={() => setNotopen(!notopen)}
                            >
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="svg-icon"
                                />
                            </a>
                            {notopen && <NotificationDropdown />}
                        </div> */}

                        {/* <Button type="button" className="mega-menu-toggler">
                            <DragHandle className="svg-icon" />
                        </Button> */}
                    </Navbar>
                </Container>
            </header>
            {/* Site Upper Header End */}
        </>
    );
};

export default Header;
