import {
    faFacebookF,
    faInstagram,
    faTiktok,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { NewsletterDataTypes } from "types/newsletter";
import { axiosClient } from "utils/axiosClient";
import { emailValidationSchema } from "utils/formValidation/emailValidation";
import { getCurrentYear } from "utils/helpers";
import { toast } from "utils/toast";

import CommingSoonModal from "./common/ComingSoonModal";
import InputField from "./common/InputField";

const Footer = () => {
    // let userdata!: User;
    // if (typeof window !== "undefined") {
    //     const userJson = localStorage.getItem("user");
    //     if (userJson) {
    //         const res = JSON.parse(userJson);
    //         userdata = res.data;
    //     }
    // }

    const { data: userdata } = useUser();
    const emailSubsMutation = useMutation((data: NewsletterDataTypes) =>
        axiosClient.post("/support/newsletter/subscribe/", data)
    );
    const onSubscribeEmail = (data: any, actions: any) => {
        emailSubsMutation.mutate(data, {
            onSuccess: (data) => {
                if (data?.data?.status === "failure") {
                    toast.error(data?.data?.message);
                } else {
                    toast.success(data?.data?.message);
                    actions.resetForm();
                }
            },
            onError: (error: any) => {
                const errmessage = error?.response?.data?.email[0];
                toast.error(errmessage);
                actions.resetForm();
                // actions.setFieldError("email", errmessage);
            },
        });
    };
    //for feature comming sonn modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <>
            <footer id="site-footer" className="site-footer bottom-0">
                <Container fluid="xl" className="px-4 site-footer__container">
                    {/* Cipher Newsletter section start */}
                    <div className="site-footer__newsletter">
                        <Row>
                            <Col sm={6} className="newsletter-text">
                                <h5>Subscribe to HOMAALE</h5>
                                <p>
                                    Get the newsletters and technical guides
                                    directly on your email from HOMAALE.
                                </p>
                            </Col>
                            <Col sm={6} className="newsletter-form">
                                <Formik
                                    initialValues={{ email: "" }}
                                    validationSchema={emailValidationSchema}
                                    onSubmit={async (values, actions) => {
                                        onSubscribeEmail(values, actions);
                                    }}
                                >
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form>
                                            <InputField
                                                type="email"
                                                name="email"
                                                error={errors.email}
                                                touch={touched.email}
                                                placeHolder="Your email address"
                                            />
                                            <div className="btn-wrapper">
                                                <button
                                                    type="submit"
                                                    className="btn"
                                                    disabled={isSubmitting}
                                                >
                                                    {errors.email ===
                                                        undefined && (
                                                        <FontAwesomeIcon
                                                            icon={faArrowRight}
                                                            className="svg-icon"
                                                        />
                                                    )}
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
                                    <h2>HOMAALE</h2>
                                    <p>
                                        Homaale is a platform designed to
                                        provide service booking solutions to the
                                        service seekers and business
                                        opportunities to various service
                                        providing companies by bridging a gap
                                        between them. It covers a wide range of
                                        services from various industries like
                                        Accounting, Gardening, Health, Beauty,
                                        and many more.
                                    </p>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>For Clients</li>
                                        <li>
                                            <Link href="/how-to-hire">
                                                <a>How to Hire?</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/payroll-services">
                                                <a>Payroll Services</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={
                                                    userdata
                                                        ? `/feedback`
                                                        : `/login?next=/feedback`
                                                }
                                            >
                                                <a>Feedback</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/hire-in-nepal">
                                                <a>Hire In Nepal</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>For Merchants</li>
                                        <li>
                                            <Link href="/how-to-find-tasks">
                                                <a>How to find Tasks?</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/freelance-tasks">
                                                <a>Freelance jobs in Nepal</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>Resources</li>
                                        <li>
                                            <Link href="/support">
                                                <a>Help and Support</a>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link href="/community">
                                                <a>Community</a>
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link href="/blogs">
                                                <a>Blog</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/discover">
                                                <a>Discover</a>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link
                                                href="/referral"
                                                as="affiliate-program"
                                            >
                                                <a>Affiliate Program</a>
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link
                                                href="/social"
                                                as="social-responsibilities"
                                            >
                                                <a>Social Responsibilities</a>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                href={
                                                    userdata
                                                        ? "/settings/account/individual"
                                                        : "/login"
                                                }
                                            >
                                                <a>HOMAALE KYC</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={2}>
                                <div className="footer-block">
                                    <ul>
                                        <li>Company</li>
                                        <li>
                                            <Link href="/about">
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contact">
                                                <a>Contact Us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/career">
                                                <a>Career</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/privacy-policy">
                                                <a>Privacy Policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/faq">
                                                <a>FAQs</a>
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
                                        href="https://www.facebook.com/profile.php?id=100086263383456"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper facebook"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebookF}
                                            className="svg-icon "
                                        />
                                    </a>
                                    <a
                                        href="https://www.tiktok.com/@homaaleservices"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper linkedIn"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTiktok}
                                            className="svg-icon "
                                        />
                                    </a>
                                    <a
                                        href="https://twitter.com/homaaleservices"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper twitter"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTwitter}
                                            className="svg-icon "
                                        />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/homaaleservices/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper instagram"
                                    >
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            className="svg-icon "
                                        />
                                    </a>
                                    {/* <a
                                        href="https://www.youtube.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="wrapper youtube"
                                    >
                                        <FontAwesomeIcon
                                            icon={faYoutube}
                                            className="svg-icon "
                                        />
                                    </a> */}
                                </div>
                            </Col>
                            <Col
                                md={6}
                                className="d-block d-md-flex justify-content-end"
                            >
                                <div>
                                    <h2>Mobile App</h2>
                                    <Row>
                                        <Col
                                            md="6"
                                            xs="6"
                                            className="d-flex justify-content-start
                                            align-items-center"
                                            onClick={() => setShow(true)}
                                        >
                                            {/* <Link href="">
                                                <a> */}
                                            <Image
                                                src="/logo/playstore.png"
                                                alt="qr"
                                                height={36}
                                                width={104}
                                            />
                                            {/* </a>
                                            </Link> */}
                                        </Col>
                                        <Col
                                            md="6"
                                            xs="6"
                                            className="d-flex justify-content-start
                                            align-items-center"
                                            onClick={() => setShow(true)}
                                        >
                                            {/* <Link href="">
                                                <a> */}
                                            <Image
                                                src="/logo/appstore.png"
                                                alt="qr"
                                                height={36}
                                                width={104}
                                            />
                                            {/* </a>
                                            </Link> */}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <p className="copyright">
                        © {getCurrentYear()} Homaale®. All Rights Reserved
                    </p>
                    {/* Cipher footer social links section end */}
                </Container>
                <CommingSoonModal show={show} handleClose={handleClose} />
            </footer>
        </>
    );
};

export default Footer;
