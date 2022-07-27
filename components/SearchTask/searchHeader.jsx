import { faBars } from "@fortawesome/pro-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Form, InputGroup, Navbar } from "react-bootstrap";

const SearchHeader = () => {
    return (
        <header id="site-upper-header" className="site-upper-header">
            <Container className="p-3">
                <Navbar expand="lg" className="upper-navigation">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
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
                        <div className="search-input">
                            <InputGroup
                                style={{ width: "576px", height: "48px" }}
                            >
                                <Form.Control
                                    placeholder="Find your Services &amp; Merchants"
                                    aria-label="Find your Services &amp; Merchants"
                                    aria-describedby="basic-addon2"
                                />
                                <Button
                                    style={{
                                        backgroundColor: "#ffca6a",
                                        padding: "0 1.3rem",
                                        border: "none",
                                        paddding: "3px 0",
                                    }}
                                    id="button-addon2"
                                >
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlass}
                                        style={{
                                            width: "1.5rem",
                                            height: "1.5rem",
                                            verticalAlign: "middle",
                                            display: "inline-block",
                                            fontSize: "12px",
                                            color: "#000",
                                        }}
                                    />
                                </Button>
                            </InputGroup>
                        </div>
                    </div>
                    <div>
                        <Link href="#!">
                            <a className="btn nav-cta-btn d-none d-md-inline-block">
                                Post Task
                            </a>
                        </Link>
                        <Navbar.Toggle aria-controls="site-navigation">
                            <FontAwesomeIcon
                                icon={faBars}
                                className="svg-icon"
                            />
                        </Navbar.Toggle>
                    </div>
                    {/* <Button type="button" className="mega-menu-toggler">
                            <DragHandle className="svg-icon" />
                        </Button> */}
                </Navbar>
            </Container>
        </header>
    );
};
export default SearchHeader;
