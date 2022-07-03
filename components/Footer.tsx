import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import InputField from "./common/InputField";

const Footer = () => {
    const emailSubscribeSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required field"),
    });
    return (
        <>
            <footer id="site-footer" className="site-footer">
                <Container>
                    {/* Cipher Newsletter section start */}
                    <div className="site-footer__newsletter">
                        <Row>
                            <Col sm={6} className="newsletter-text">
                                <h5>Subscribe to CIPHER</h5>
                                <p>A newsletter for customers covering techniques, technical guides, and hiring process coming from CIPHER.</p>
                            </Col>
                            <Col sm={6} className="newsletter-form">
                                <Formik
                                    initialValues={{ email: "" }}
                                    validationSchema={emailSubscribeSchema}
                                    onSubmit={async (values) => {
                                        console.log(values)
                                    }}
                                >
                                    {({
                                        isSubmitting,
                                        errors,
                                        touched,
                                    }) => (
                                        <Form>
                                            <InputField
                                                type="email"
                                                name="email"
                                                error={errors.email}
                                                touch={touched.email}
                                                placeHolder="Enter your email"
                                            />
                                            <div className="btn-wrapper">
                                                <button
                                                    type="submit"
                                                    className="btn"
                                                    disabled={isSubmitting}>
                                                    <FontAwesomeIcon icon={faArrowRight} className="svg-icon" />
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </div>
                    {/* Cipher Newsletter section end */}

                    {/* Cipher Footer navigation start */}
                    <div className="site-footer__footer-navigation">
                        <Row className="gx-5">
                            <Col md={4}>
                                <div className="footer-block">
                                    <h2>CIPHER</h2>
                                    <p>
                                        As a digital and social entrepreneur, MICK invests and it is a consults with a wide array of start ups and early stage is an companies.  and social entrepreneur, MICK invests and op consults with a wide array of start ups and early stage on the companies. and social entrepreneur, MICK invests and consults with a wide array of start ups and early stage der it companies.<br /><br />

                                        And social entrepreneur, MICK invests and consults with a wide array of start ups and early stage companies.
                                    </p>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>
                                            For Clients
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>How to Hire?</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Merchant Marketplace</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/">
                                                <a>Payroll Services</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Hire in the Nepal</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>
                                            For Merchants
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>How to find Tasks?</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Freelance jobs in Nepal</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>
                                            Resources
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Help and Support</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Community</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/">
                                                <a>Resources</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Blog</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Discover</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Affiliate Program</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Social Responsibilities</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>
                                            Company
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contact">
                                                <a>Contact Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy">
                                                <a>Privacy Policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Sitemap</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a>Faqs</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/terms-conditions">
                                                <a>Terms and Conditions</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    {/* Cipher Footer navigation end */}

                    {/* Cipher footer social links section start */}
                    <div className="site-footer__social-links">
                        <Row>
                            <Col md={6}>
                                <h2>Follow Us</h2>
                                <div className="social-sites">
                                    <a
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper facebook">
                                        <FontAwesomeIcon icon={faFacebookF} className="svg-icon " />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper linkedIn">
                                        <FontAwesomeIcon icon={faLinkedinIn} className="svg-icon " />
                                    </a>
                                    <a
                                        href="https://www.twitter.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper twitter">
                                        <FontAwesomeIcon icon={faTwitter} className="svg-icon " />
                                    </a>
                                    <a
                                        href="https://www.instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper instagram">
                                        <FontAwesomeIcon icon={faInstagram} className="svg-icon " />
                                    </a>
                                    <a
                                        href="https://www.youtube.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper youtube">
                                        <FontAwesomeIcon icon={faYoutube} className="svg-icon " />
                                    </a>
                                </div>
                            </Col>
                            <Col md={6} className="d-block d-md-flex justify-content-end">
                                <div>
                                    <h2>Mobile App</h2>
                                    <Row>
                                        <Col md="6">
                                            <Link href="">
                                                <a>
                                                    <Image
                                                        src="/logo/playstore.png"
                                                        alt="qr"
                                                        height={36}
                                                        width={104}
                                                    />
                                                </a>
                                            </Link>
                                        </Col>
                                        <Col md="6">
                                            <Link href="">
                                                <a>
                                                    <Image
                                                        src="/logo/appstore.png"
                                                        alt="qr"
                                                        height={36}
                                                        width={104}
                                                    />
                                                </a>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <p className="copyright">
                        © 2022 - 2026 Cipher® Global Inc. All Rights Reserved
                    </p>
                    {/* Cipher footer social links section end */}
                </Container>
            </footer>
        </>
    )
}
export default Footer;