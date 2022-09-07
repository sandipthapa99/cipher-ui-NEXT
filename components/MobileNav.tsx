import {
    faBars,
    faBell,
    faHome,
    faSearch,
    faUser,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleMenuActive } from "utils/helpers";

interface MobileProps {
    getSide: any;
}
const MobileNav = ({ getSide }: MobileProps) => {
    const [sideBarOpened, setSideBarOpened] = useState(false);
    const router = useRouter();

    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY < lastScrollY) {
                // if scroll down hide the navbar
                setShow(false);
            } else {
                // if scroll up show the navbar
                setShow(true);
            }

            // remember current page location to use in the next move
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar);

            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);
    return (
        <div className="mobile-nav d-block d-md-none">
            <nav className={`nav-active ${show && "nav-hidden"}`}>
                <Link href="/">
                    <a className={`nav-link ${handleMenuActive("/", router)}`}>
                        <FontAwesomeIcon icon={faHome} className="nav-icon" />
                        {/* <span className="nav__text">Dashboard</span> */}
                    </a>
                </Link>
                <Link href="/search">
                    <a
                        className={`nav-link ${handleMenuActive(
                            "/search",
                            router
                        )}`}
                    >
                        <FontAwesomeIcon icon={faSearch} className="nav-icon" />
                    </a>
                </Link>
                <Link href="/profile">
                    <a
                        className={`nav-link ${handleMenuActive(
                            "/profile",
                            router
                        )}`}
                    >
                        <FontAwesomeIcon icon={faUser} className="nav-icon" />
                    </a>
                </Link>
                <Link href="/notifications">
                    <a
                        className={`nav-link ${handleMenuActive(
                            "/notifications",
                            router
                        )}`}
                    >
                        <FontAwesomeIcon icon={faBell} className="nav-icon" />
                    </a>
                </Link>
                <Link href="">
                    <a
                        className={`nav-link ${handleMenuActive("", router)}`}
                        onClick={() => {
                            setSideBarOpened(() => !sideBarOpened);
                            getSide(sideBarOpened);
                        }}
                    >
                        <FontAwesomeIcon icon={faBars} className="nav-icon" />
                    </a>
                </Link>
            </nav>
        </div>
    );
};
export default MobileNav;
