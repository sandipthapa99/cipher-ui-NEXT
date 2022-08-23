import {
    faAngleDown,
    faBell,
    faListCheck,
    faLocationDot,
    faObjectsColumn,
    faTelescope,
} from "@fortawesome/pro-regular-svg-icons";
import { faUserHelmetSafety } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useLocation } from "hooks/location/useLocation";
import { useWeather } from "hooks/weather/useWeather";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { handleMenuActive } from "utils/helpers";

import { Dropdown } from "./common/Dropdown";
import { NotificationDropdown } from "./notifications/NotificationDropdown";

const Header = () => {
    const date = format(new Date(), "MMMM d");
    const { data: weather } = useWeather();
    const { data: location } = useLocation();
    const getIcon = weather?.weather[0].icon;

    const router = useRouter();
    const [notopen, setNotopen] = useState(false);

    return (
        <>
            {/* Site Upper Header Start */}
            <header
                id="site-header"
                className="site-header sticky-wrapper-header"
            >
                <Container fluid="xl">
                    <Navbar expand="lg" className="header-navigation">
                        <nav className="navbar-nav ms-lg-auto">
                            <li
                                className={handleMenuActive(
                                    "/explore-services",
                                    router
                                )}
                            >
                                <Link href="/explore-services">
                                    <a className="nav-link">
                                        <FontAwesomeIcon
                                            icon={faTelescope}
                                            className="svg-icon d-none d-sm-inline-block"
                                        />
                                        Explore Services
                                    </a>
                                </Link>
                            </li>
                            <li className={handleMenuActive("/task", router)}>
                                <Link href="/task">
                                    <a className="nav-link">
                                        <FontAwesomeIcon
                                            icon={faListCheck}
                                            className="svg-icon d-none d-sm-inline-block"
                                        />
                                        Find Tasks
                                    </a>
                                </Link>
                            </li>
                            <li className={handleMenuActive("/tasker", router)}>
                                <Link href="/tasker">
                                    <a className="nav-link">
                                        <FontAwesomeIcon
                                            icon={faUserHelmetSafety}
                                            className="svg-icon d-none d-sm-inline-block"
                                        />
                                        Find Taskers
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
                                        <a className="nav-link d-none d-md-inline-block">
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
                        <div className="d-flex align-items-center gap-3">
                            {weather && (
                                <Link href="#!">
                                    <a className="btn location-btn d-none d-md-inline-block">
                                        {weather
                                            ? `${Math.floor(
                                                  weather.main.temp
                                              )}°C`
                                            : "N/A"}
                                    </a>
                                </Link>
                            )}
                            {weather && (
                                <Image
                                    src={`https://openweathermap.org/img/wn/${getIcon}@2x.png`}
                                    alt="weather"
                                    width={30}
                                    height={30}
                                />
                            )}
                        </div>
                        <Link href="#!">
                            <a
                                className="btn location-btn d-none d-md-inline-block"
                                style={{ margin: "0 1.6rem 0 1.6rem" }}
                            >
                                {date}
                            </a>
                        </Link>
                        {location && (
                            <Link href="#!">
                                <a
                                    className="btn location-btn d-none d-md-inline-block"
                                    style={{ marginRight: "1.6rem" }}
                                >
                                    {location?.city}
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="svg-icon"
                                    />
                                </a>
                            </Link>
                        )}

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
                    </Navbar>
                </Container>
            </header>
            {/* Site Upper Header End */}
        </>
    );
};

export default Header;
