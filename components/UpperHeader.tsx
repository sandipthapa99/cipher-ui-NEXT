import { faBars } from "@fortawesome/pro-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "context/AuthContext/userContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { profileCardContent } from "staticData/profileCardContent";
import { handleMenuActive } from "utils/helpers";

import { ProfileModel } from "./model/ProfileModel";
import { PostCard } from "./PostTask/PostCard";
import PostModal from "./PostTask/PostModal";

export function UpperHeader() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [notopen, setNotopen] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const { token } = useAuthContext();

    return (
        <>
            {/* Site Upper Header Start */}
            <header id="site-upper-header" className="site-upper-header">
                <Container fluid="xl" className="px-5">
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
                                    <Link href="/how-it-works">
                                        <a className="nav-link">How It Works</a>
                                    </Link>
                                </li>
                                <li
                                    className={handleMenuActive(
                                        "/resources",
                                        router
                                    )}
                                >
                                    <Link href="/resources">
                                        <a className="nav-link">Resources</a>
                                    </Link>
                                </li>
                                {!token && (
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
                                )}
                                {!token && (
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
                                )}
                            </nav>
                        </Navbar.Collapse>

                        {!token && (
                            <>
                                <Link href="/login">
                                    <a className="btn login-btn d-none d-md-inline-block">
                                        Login
                                    </a>
                                </Link>
                                <Link href="/signup">
                                    <a className="btn login-btn d-none d-md-inline-block">
                                        Sign Up
                                    </a>
                                </Link>
                            </>
                        )}
                        {token && (
                            <div className="user-profile">
                                <span
                                    className="btn location-btn d-none d-md-inline-block"
                                    onClick={() => setNotopen(!notopen)}
                                >
                                    <figure className="thumbnail-img">
                                        <Image
                                            src="/userprofile/profile.svg"
                                            layout="fill"
                                            alt="profile-pic"
                                            className="rounded-circle"
                                            objectFit="cover"
                                        />
                                    </figure>
                                </span>
                                {notopen && (
                                    <ProfileModel
                                        profile={profileCardContent}
                                    />
                                )}
                            </div>
                        )}

                        {token && (
                            <button
                                style={{ outline: "none", border: "none" }}
                                onClick={handleShow}
                            >
                                <a className="btn nav-cta-btn d-none d-md-inline-block">
                                    Post Task
                                </a>
                            </button>
                        )}

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
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                className="post-modal"
            >
                <Modal.Header className="mt-4" closeButton></Modal.Header>
                <Modal.Body>
                    <PostModal onSubmit={handleClose} />
                </Modal.Body>
            </Modal>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />

            {/* Site Upper Header End */}
        </>
    );
}

export default UpperHeader;
