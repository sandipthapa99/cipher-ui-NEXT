import { Indicator } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import {
    ChatOutlined,
    DashboardOutlined,
    ExploreOutlined,
    KeyboardArrowDown,
    LocationOnOutlined,
    NotificationsOutlined,
    PersonSearchOutlined,
    PlagiarismOutlined,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useLocation } from "hooks/location/useLocation";
import { useGetNotification } from "hooks/Notifications/use-notification";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useWeather } from "hooks/weather/useWeather";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { handleMenuActive } from "utils/helpers";

import { Dropdown } from "./common/Dropdown";
import { NotificationDropdown } from "./notifications/NotificationDropdown";
import { RasifalSlideComponent } from "./Rasifal/RasifalSlideComponent";

const Header = () => {
    const date = format(new Date(), "MMMM d");
    const { data: location } = useLocation();
    //

    const { data: weather } = useWeather();
    //

    const getIcon = weather?.weather[0].icon;

    const router = useRouter();
    const [notopen, setNotopen] = useState(false);
    const [rasifal, setRasifal] = useState(false);
    const { data: profileDetails } = useGetProfile();
    const { data: allNotification } = useGetNotification();

    const notificationRef = useClickOutside(() => setNotopen(false));

    return (
        <>
            {/* Site Upper Header Start */}
            <header
                id="site-header"
                className="site-header sticky-wrapper-header"
            >
                <Container fluid="xl" className="px-4">
                    <Navbar expand="lg" className="header-navigation">
                        <nav className="navbar-nav ms-lg-auto">
                            <li
                                className={handleMenuActive("/service", router)}
                            >
                                <Link href="/service">
                                    <a className="nav-link">
                                        <ExploreOutlined className="svg-icon d-none d-sm-inline-block" />
                                        Explore Services
                                    </a>
                                </Link>
                            </li>
                            <li className={handleMenuActive("/task", router)}>
                                <Link href="/task">
                                    <a className="nav-link">
                                        <PlagiarismOutlined className="svg-icon d-none d-sm-inline-block" />
                                        Find Tasks
                                    </a>
                                </Link>
                            </li>
                            <li className={handleMenuActive("/tasker", router)}>
                                <Link href="/tasker">
                                    <a className="nav-link">
                                        <PersonSearchOutlined className="svg-icon d-none d-sm-inline-block" />
                                        Find Taskers
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={handleMenuActive(
                                    "/category",
                                    router
                                )}
                            >
                                <Link href="/category">
                                    <a className="nav-link d-none responsive-category">
                                        <DashboardOutlined className="svg-icon d-none d-sm-inline-block" />
                                        Categories
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
                                        <a className="nav-link d-none d-md-inline-block categories-menu">
                                            <DashboardOutlined className="svg-icon d-none d-sm-inline-block" />
                                            Categories
                                            <KeyboardArrowDown className="faAngleDown-svg-icon" />
                                        </a>
                                    </Link>
                                </li>
                            </Dropdown>
                        </nav>
                        <div className="d-flex align-items-center gap-3 weather-container">
                            {weather && (
                                <Link href="#!">
                                    <a className="btn location-btn d-none d-md-inline-block">
                                        {weather
                                            ? `${Math.floor(
                                                  weather.main.temp
                                              )}??C`
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
                                    {location?.data?.city}
                                    <LocationOnOutlined className="svg-icon" />
                                </a>
                            </Link>
                        )}
                        {profileDetails ? (
                            <Link href="/client/message">
                                <a
                                    className="btn location-btn d-none d-md-inline-block"
                                    style={{ marginRight: "1.6rem" }}
                                >
                                    <ChatOutlined className="svg-icon" />
                                </a>
                            </Link>
                        ) : null}

                        {profileDetails ? (
                            <div
                                className="notification-icon-wrapper"
                                ref={notificationRef}
                            >
                                <a
                                    className="btn location-btn d-none d-md-inline-block"
                                    onClick={() =>
                                        setNotopen(
                                            (currentNotopen) => !currentNotopen
                                        )
                                    }
                                >
                                    <div className="bell-icon-header">
                                        {allNotification &&
                                        allNotification?.pages[0]
                                            ?.unread_count > 0 ? (
                                            <Indicator
                                                color="#e62e04"
                                                label={
                                                    allNotification?.pages[0]
                                                        ?.unread_count
                                                }
                                                inline
                                                size={15}
                                            >
                                                <NotificationsOutlined className="svg-icon" />
                                            </Indicator>
                                        ) : (
                                            <NotificationsOutlined className="svg-icon" />
                                        )}
                                    </div>
                                </a>
                                {notopen && <NotificationDropdown />}
                            </div>
                        ) : null}

                        <Link href="">
                            <a
                                className="btn location-btn d-none d-md-inline-block"
                                style={{ margin: "0 1.6rem 0 1.6rem" }}
                                onClick={() =>
                                    router.pathname === "/rasifal"
                                        ? setRasifal(false)
                                        : setRasifal(true)
                                }
                            >
                                ??????????????????
                            </a>
                        </Link>
                    </Navbar>
                </Container>
            </header>
            <RasifalSlideComponent rasifal={rasifal} setRasifal={setRasifal} />

            {/* Site Upper Header End */}
        </>
    );
};

export default Header;
