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
import { Button, Indicator } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
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
import { axiosClient } from "utils/axiosClient";
import { handleMenuActive } from "utils/helpers";

import { Dropdown } from "./common/Dropdown";
import { NotificationDropdown } from "./notifications/NotificationDropdown";
import { RasifalSlideComponent } from "./Rasifal/RasifalSlideComponent";
import { ReviewModal } from "./Review/ReviewModal";

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
    const { data: allNotification, refetch } = useGetNotification();

    const notificationRef = useClickOutside(() => setNotopen(false));

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
                                className={handleMenuActive("/service", router)}
                            >
                                <Link href="/service">
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
                            <li
                                className={handleMenuActive(
                                    "/category",
                                    router
                                )}
                            >
                                <Link href="/category">
                                    <a className="nav-link d-none responsive-category">
                                        <FontAwesomeIcon
                                            icon={faObjectsColumn}
                                            className="svg-icon d-none d-sm-inline-block"
                                        />
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
                        <div className="d-flex align-items-center gap-3 weather-container">
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
                                    {location?.data?.city}
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="svg-icon"
                                    />
                                </a>
                            </Link>
                        )}

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
                                    <div
                                        className="bell-icon-header"
                                        onClick={async () => {
                                            const response =
                                                await axiosClient.get(
                                                    "/notification/read/"
                                                );

                                            if (response.status === 200) {
                                                refetch();
                                                // await queryClient.invalidateQueries([
                                                //     "notification",
                                                // ]);
                                            }
                                        }}
                                    >
                                        {allNotification &&
                                        allNotification?.unread_count > 0 ? (
                                            <Indicator
                                                color="#e62e04"
                                                label={
                                                    allNotification?.unread_count
                                                }
                                                inline
                                                size={15}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faBell}
                                                    className="svg-icon"
                                                />
                                            </Indicator>
                                        ) : (
                                            <FontAwesomeIcon
                                                icon={faBell}
                                                className="svg-icon"
                                            />
                                        )}
                                    </div>
                                </a>
                                {notopen && <NotificationDropdown />}
                            </div>
                        ) : null}

                        <Link href="#!">
                            <a
                                className="btn location-btn d-none d-md-inline-block"
                                style={{ margin: "0 1.6rem 0 1.6rem" }}
                                onClick={() =>
                                    setRasifal(
                                        (currentRasifal) => !currentRasifal
                                    )
                                }
                            >
                                राशिफल
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
