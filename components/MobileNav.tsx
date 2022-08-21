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
import { handleMenuActive } from "utils/helpers";

const MobileNav = () => {
    const router = useRouter();
    return (
        <div className="mobile-nav d-block d-md-none">
            <nav className="nav">
                <Link href="/">
                    <a className={`nav__link ${handleMenuActive("/", router)}`}>
                        <FontAwesomeIcon icon={faHome} className="nav__icon" />
                        {/* <span className="nav__text">Dashboard</span> */}
                    </a>
                </Link>
                <Link href="/search">
                    <a
                        className={`nav__link ${handleMenuActive(
                            "/search",
                            router
                        )}`}
                    >
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="nav__icon"
                        />
                    </a>
                </Link>
                <Link href="/profile">
                    <a
                        className={`nav__link ${handleMenuActive(
                            "/profile",
                            router
                        )}`}
                    >
                        <FontAwesomeIcon icon={faUser} className="nav__icon" />
                    </a>
                </Link>
                <Link href="/notifications">
                    <a
                        className={`nav__link ${handleMenuActive(
                            "/notifications",
                            router
                        )}`}
                    >
                        <FontAwesomeIcon icon={faBell} className="nav__icon" />
                    </a>
                </Link>
                <Link href="">
                    <a className={`nav__link ${handleMenuActive("", router)}`}>
                        <FontAwesomeIcon icon={faBars} className="nav__icon" />
                    </a>
                </Link>
            </nav>
        </div>
    );
};
export default MobileNav;
