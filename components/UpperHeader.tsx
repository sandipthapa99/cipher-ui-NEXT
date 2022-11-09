import { ProfileModel } from "@components/model/ProfileModel";
import { PostTaskModal } from "@components/Task/PostTaskModal";
import { KYCIncompleteToast } from "@components/toasts/KYCIncompleteToast";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import {
    Avatar,
    Button as MantineButton,
    Group,
    Stack,
    Text,
} from "@mantine/core";
import { useClickOutside, useToggle } from "@mantine/hooks";
import { cleanNotifications } from "@mantine/notifications";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Navbar } from "react-bootstrap";
import { useToggleShowPostTaskModal } from "store/use-show-post-task";
import { handleMenuActive } from "utils/helpers";
import { toast } from "utils/toast";

import { PostCard } from "./PostTask/PostCard";

export function UpperHeader() {
    const router = useRouter();
    const { data: profile } = useGetProfile();
    const toggleShowPostTaskModal = useToggleShowPostTaskModal();
    const { data: user } = useUser();

    const [showProfileModal, toggleShowProfileModal] = useToggle([false, true]);
    const profileModalRef = useClickOutside(() =>
        toggleShowProfileModal(false)
    );

    // const checkPageForHeader =
    //     router.pathname !== "/" &&
    //     router.pathname !== "/about" &&
    //     router.pathname !== "/contact-us" &&
    //     router.pathname !== "/career" &&
    //     router.pathname !== "/discover" &&
    //     router.pathname !== "/help" &&
    //     router.pathname !== "/privacy-policy" &&
    //     router.pathname !== "/terms-conditions" &&
    //     router.pathname !== "/faq" &&
    //     router.pathname !== "/blogs";

    const { data: profileDetails } = useGetProfile();

    const handleShowPostTaskModal = () => {
        if (!profile) {
            toast.showComponent(
                "Profile Incomplete",
                <ProfileNotCompleteToast text="Please complete your profile before posting a task." />
            );
            return;
        }
        if (!user?.is_kyc_verified) {
            toast.showComponent("KYC Incomplete", <KYCIncompleteToast />);
            return;
        }
        toggleShowPostTaskModal();
    };
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
                                            src="/logo/homaale-logo_svg.svg"
                                            alt="Logo"
                                            width={172}
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

                                <li
                                    className={`d-none d-md-block ${handleMenuActive(
                                        "/hire-in-nepal",
                                        router
                                    )}`}
                                >
                                    <Link href="/hire-in-nepal">
                                        <a className="nav-link">
                                            Hire In Nepal
                                        </a>
                                    </Link>
                                </li>
                            </div>
                        </div>
                        {/* {checkPageForHeader && (
                            <div className="upper-navigation__center d-none d-md-block">
                                <div className="search-input d-md-flex">
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
                        )} */}
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
                                <button
                                    onClick={() => handleShowPostTaskModal()}
                                    className="nav-cta-btn"
                                >
                                    Post Task
                                </button>
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
                                        <Avatar
                                            src={profileDetails?.profile_image}
                                            radius="xl"
                                            size={44}
                                            alt="it's me"
                                        />
                                        {/* <figure className="thumbnail-img">
                                            <Image
                                                src={
                                                    profileDetails?.profile_image ??
                                                    "/userprofile/unknownPerson.jpg"
                                                }
                                                layout="fill"
                                                alt="profile-pic"
                                                className="rounded-circle"
                                                objectFit="cover"
                                            />
                                        </figure> */}
                                    </span>
                                    {showProfileModal && <ProfileModel />}
                                </div>
                            )}
                        </div>
                    </Navbar>
                </Container>
            </header>
            <PostTaskModal />
            {/* <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                className="post-modal"
            >
                <Modal.Header className="mt-4" closeButton></Modal.Header>
                <Modal.Body>
                    <PostModal setshowPostModel={handleClose} />
                </Modal.Body>
            </Modal> */}
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
interface ProfileNotComplete {
    text: string;
}
export const ProfileNotCompleteToast = ({ text }: ProfileNotComplete) => {
    const router = useRouter();
    return (
        <Stack>
            <Text>{text}</Text>
            <Group>
                <MantineButton
                    variant="white"
                    color="gray"
                    onClick={() => cleanNotifications()}
                >
                    Cancel
                </MantineButton>
                <MantineButton
                    color="yellow"
                    onClick={() => {
                        cleanNotifications();
                        router.push("/profile");
                    }}
                >
                    Complete Profile
                </MantineButton>
            </Group>
        </Stack>
    );
};
export default UpperHeader;
