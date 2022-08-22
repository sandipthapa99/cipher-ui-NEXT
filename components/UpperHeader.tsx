import { ProfileModel } from "@components/model/ProfileModel";
import { faBars, faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside, useToggle } from "@mantine/hooks";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container, Form, InputGroup, Navbar } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { handleMenuActive } from "utils/helpers";

import { PostCard } from "./PostTask/PostCard";
import PostModal from "./PostTask/PostModal";

export function UpperHeader() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const { data: user } = useUser();

    const [showProfileModal, toggleShowProfileModal] = useToggle([false, true]);
    const profileModalRef = useClickOutside(() =>
        toggleShowProfileModal(false)
    );

    const checkPageForHeader =
        router.pathname !== "/" &&
        router.pathname !== "/about" &&
        router.pathname !== "/contact-us" &&
        router.pathname !== "/career" &&
        router.pathname !== "/discover" &&
        router.pathname !== "/help" &&
        router.pathname !== "/privacy-policy" &&
        router.pathname !== "/terms-conditions" &&
        router.pathname !== "/faq" &&
        router.pathname !== "/blogs";

    return (
        <>
            {/* Site Upper Header Start */}
            <header id="site-upper-header" className="site-upper-header">
                <Container fluid="xl">
                    <Navbar
                        expand="lg"
                        className="upper-navigation ms-lg-auto d-flex align-items-center justify-content-between"
                    >
                        <div className="upper-navigation__left d-flex align-items-center">
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
                            <div className="d-flex">
                                <li
                                    className={`d-none d-md-inline-block ${handleMenuActive(
                                        "/how-it-works",
                                        router
                                    )}`}
                                >
                                    <Link href="/how-it-works">
                                        <a className="nav-link">How It Works</a>
                                    </Link>
                                </li>
                                <li
                                    className={`d-none d-md-block ${handleMenuActive(
                                        "/resources",
                                        router
                                    )}`}
                                >
                                    <Link href="/resources">
                                        <a className="nav-link">Resources</a>
                                    </Link>
                                </li>
                            </div>
                        </div>
                        {checkPageForHeader && (
                            <div className="upper-navigation__center">
                                <div className="search-input d-none d-md-flex">
                                    <Form.Control
                                        placeholder="Find your Services"
                                        aria-label="Find your Services &amp; Taskers"
                                        aria-describedby="basic-addon2"
                                    />
                                    <Button
                                        className="search-btn"
                                        id="button-addon2"
                                    >
                                        <FontAwesomeIcon
                                            className="search-icon"
                                            icon={faMagnifyingGlass}
                                        />
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="upper-navigation__right d-flex">
                            {!user && (
                                <>
                                    <Link href="/login">
                                        <a className="auth-btn login-btn">
                                            Login
                                        </a>
                                    </Link>
                                    <Link href="/signup">
                                        <a className="auth-btn signup-btn">
                                            Sign Up
                                        </a>
                                    </Link>
                                </>
                            )}
                            {user && (
                                <div
                                    ref={profileModalRef}
                                    className="user-profile"
                                >
                                    <span
                                        className="profile-btn"
                                        onClick={() => toggleShowProfileModal()}
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
                                    {showProfileModal && <ProfileModel />}
                                </div>
                            )}

                            {user && (
                                <button
                                    onClick={handleShow}
                                    className="nav-cta-btn"
                                >
                                    Post Task
                                </button>
                            )}
                        </div>
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
                    <PostModal setshowPostModel={handleClose} />
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
