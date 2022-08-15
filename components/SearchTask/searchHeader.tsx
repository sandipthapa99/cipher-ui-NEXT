import { ProfileModel } from "@components/model/ProfileModel";
import { PostCard } from "@components/PostTask/PostCard";
import PostModal from "@components/PostTask/PostModal";
import { faBars, faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Modal,
    Navbar,
    Row,
} from "react-bootstrap";
import { profileCardContent } from "staticData/profileCardContent";

const SearchHeader = () => {
    const { data, isLoading } = useUser();
    const [notopen, setNotopen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    return (
        <>
            <header id="site-upper-header" className="site-upper-header">
                <Container>
                    <Navbar expand="lg" className="upper-navigation">
                        <Row className="row-logo-search">
                            <Col md={8} className="logo-search-cont">
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

                                <InputGroup className="search-input">
                                    <Form.Control
                                        placeholder="Find your Services &amp; Merchants"
                                        aria-label="Find your Services &amp; Merchants"
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
                                </InputGroup>
                            </Col>
                            {!isLoading && data ? (
                                <Col md={3} className="profile-post">
                                    <div className="user-profile">
                                        <span
                                            onClick={() => setNotopen(!notopen)}
                                            className="btn location-btn d-none d-md-inline-block"
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
                                    <button
                                        className="post-btn"
                                        onClick={handleShow}
                                    >
                                        <a className="btn nav-cta-btn d-none d-md-inline-block">
                                            Post Task
                                        </a>
                                    </button>
                                </Col>
                            ) : (
                                <Col
                                    md={3}
                                    className="d-flex justify-content-end"
                                >
                                    <Link href="/login">
                                        <a className="btn login-btn">Login</a>
                                    </Link>
                                    <Link href="/signup">
                                        <a className="btn login-btn d-md-inline-block">
                                            Signup
                                        </a>
                                    </Link>
                                </Col>
                            )}
                            <Col md={4}>
                                <Navbar.Toggle aria-controls="site-navigation">
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        className="svg-icon"
                                    />
                                </Navbar.Toggle>
                            </Col>
                        </Row>
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
        </>
    );
};
export default SearchHeader;
