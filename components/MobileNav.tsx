import {
    HomeOutlined,
    Menu,
    NotificationsOutlined,
    PersonOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { handleMenuActive } from "utils/helpers";

interface MobileProps {
    getSide?: any;
}
const MobileNav = ({ getSide }: MobileProps) => {
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
                        <HomeOutlined className="nav-icon" />
                        {/* <span className="nav__text">Dashboard</span> */}
                    </a>
                </Link>
                <Link href="/profile">
                    <a
                        className={`nav-link ${handleMenuActive(
                            "/profile",
                            router
                        )}`}
                    >
                        <PersonOutlined className="nav-icon" />
                    </a>
                </Link>
                <Link href="/notifications">
                    <a
                        className={`nav-link ${handleMenuActive(
                            "/notifications",
                            router
                        )}`}
                    >
                        <NotificationsOutlined className="nav-icon" />
                    </a>
                </Link>
                <Link href="">
                    <a
                        className={`nav-link ${handleMenuActive("", router)}`}
                        onClick={() => {
                            // setSideBarOpened(() => !sideBarOpened);
                            getSide((prev: boolean) => !prev);
                        }}
                    >
                        <Menu className="nav-icon" />
                    </a>
                </Link>
            </nav>
        </div>
    );
};
export default MobileNav;
