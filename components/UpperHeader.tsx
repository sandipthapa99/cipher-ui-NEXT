import { ProfileModel } from "@components/model/ProfileModel";
import { faBars } from "@fortawesome/pro-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useClickOutside, useToggle } from "@mantine/hooks";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
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

    return (
        <>
            {/* Site Upper Header Start */}
            <header id="site-upper-header" className="site-upper-header">
                <Container fluid="xl">
                    <Navbar expand="lg" className="upper-navigation ms-lg-auto">
                        <div className="upper-navigation__left">
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
                        </div>
                        <div className="upper-navigation__right">
                            {!user && (
                                <>
                                    <Link href="/login">
                                        <a className="btn login-btn d-none d-md-inline-block">
                                            Login
                                        </a>
                                    </Link>
                                    <Link href="/signup">
                                        <a className="btn signup-btn d-none d-md-inline-block">
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
                                        className="btn location-btn d-none d-md-inline-block"
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
                                    style={{ outline: "none", border: "none" }}
                                    onClick={handleShow}
                                >
                                    <a className="btn nav-cta-btn d-none d-md-inline-block">
                                        Post Task
                                    </a>
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
