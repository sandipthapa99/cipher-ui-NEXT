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
import { useAllLocations } from "hooks/location/useAllLocations";
import { useLocation } from "hooks/location/useLocation";
import { useWeather } from "hooks/weather/useWeather";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { handleMenuActive } from "utils/helpers";

// import { handleMenuActive } from "../../../../libs/util-formatter/src";
import { Dropdown } from "./common/Dropdown";
import { NotificationDropdown } from "./notifications/NotificationDropdown";

const Header = () => {
    const date = new Date();
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const day = date.getDate();
    const monthName = month[date.getMonth()];
    // const [allCountries, setAllCountries] = useState([]);

    // const {data} = useLocation()
    const { data: weather } = useWeather();

    // console.log(data);
    console.log(weather);

    const router = useRouter();
    const [notopen, setNotopen] = useState(false);
    const [stickyClass, setStickyClass] = useState("relative");
    useEffect(() => {
        window.addEventListener("scroll", stickNavbar);

        return () => {
            window.removeEventListener("scroll", stickNavbar);
        };
    }, []);

    useEffect(() => {
        if (notopen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [notopen]);

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
                            <a
                                className="btn location-btn d-none d-md-inline-block"
                                style={{ marginRight: "1.6rem" }}
                            >
                                {Math.floor(weather?.data?.main?.temp - 273)}°C
                                {/* <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="svg-icon"
                                /> */}
                            </a>
                        </Link>
                        <Link href="#!">
                            <a
                                className="btn location-btn d-none d-md-inline-block"
                                style={{ marginRight: "1.6rem" }}
                            >
                                {`${day} ${monthName}`}
                            </a>
                        </Link>
                        <Link href="#!">
                            <a
                                className="btn location-btn d-none d-md-inline-block"
                                style={{ marginRight: "1.6rem" }}
                            >
                                {/* {data?.data.city} */}
                                {weather?.data?.name}
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
                    </Navbar>
                </Container>
            </header>
            {/* Site Upper Header End */}
        </>
    );
};

export default Header;
