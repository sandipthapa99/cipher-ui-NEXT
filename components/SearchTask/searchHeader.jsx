import { ProfileModel } from "@components/model/ProfileModel";
import { faBars } from "@fortawesome/pro-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Navbar,
    Row,
} from "react-bootstrap";
import { profileCardContent } from "staticData/profileCardContent";

const SearchHeader = () => {
    const [notopen, setNotopen] = useState(false);
    return (
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
                            <button className="post-btn">
                                <a className="btn nav-cta-btn d-none d-md-inline-block">
                                    Post Task
                                </a>
                            </button>
                        </Col>
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
    );
};
export default SearchHeader;
