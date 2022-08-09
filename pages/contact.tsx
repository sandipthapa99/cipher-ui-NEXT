import Breadcrum from "@components/common/Breadcrum";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import Layout from "@components/Layout";
import {
    faFacebookF,
    faGoogle,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { useContact } from "hooks/contact-and-support/contact";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { ContactFormData } from "utils/contactFormData";
import contactFormSchema from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Contact = () => {
    const { mutate, isLoading } = useContact();
    return (
        <Layout title="Contact Us | Cipher">
            <section className="contact-page-header">
                <Breadcrum currentPage="Contact Us" />
                <Container>
                    <div className="contact-page-header__description">
                        <h1>Contact Us</h1>
                        <h2>
                            With everything &amp; anything you&apos;re confused
                            about
                        </h2>
                    </div>
                </Container>
            </section>
            <section className="contact-page-form">
                <Container>
                    <Row className="gx-5">
                        <Col md={6} className="left-block">
                            <div className="contact-block address">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="svg-icon location"
                                />
                                <a>
                                    Dhobi Khola, Buddhanagar, Kathmandu, Nepal
                                </a>
                            </div>

                            <div className="contact-block phone">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="svg-icon phone"
                                />
                                <Link href="tel:1234567890">
                                    <a>+977-123456789</a>
                                </Link>
                            </div>

                            <div className="contact-block social-sites">
                                <div className="social-item">
                                    <FontAwesomeIcon
                                        icon={faFacebookF}
                                        className="svg-icon facebook"
                                    />
                                    <Link href="https://www.facebook.com">
                                        <a>Facebook</a>
                                    </Link>
                                </div>
                                <div className="social-item">
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        className="svg-icon twitter"
                                    />
                                    <Link href="https://www.twitter.com">
                                        <a>Twitter</a>
                                    </Link>
                                </div>
                                <div className="social-item">
                                    <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="svg-icon google"
                                    />
                                    <Link href="https://www.google.com">
                                        <a>Google</a>
                                    </Link>
                                </div>
                            </div>

                            <div className="contact-block map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9640853500664!2d85.32581115122471!3d27.687504882715686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19095c0dfbe9%3A0xeabd594ec46dbdfb!2sCagtu%20Nepal!5e0!3m2!1sen!2snp!4v1657167397198!5m2!1sen!2snp"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen={false}
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="map-frame"
                                ></iframe>
                            </div>
                        </Col>
                        <Col md={6} className="right-block">
                            <h1>Leave us a message</h1>
                            <Formik
                                initialValues={ContactFormData}
                                validationSchema={contactFormSchema}
                                onSubmit={async (values) => {
                                    mutate(values, {
                                        onSuccess: async () => {
                                            toast.success(
                                                "Message sent successfully"
                                            );
                                        },
                                        onError: async (error) => {
                                            toast.error(error.message);
                                        },
                                    });
                                }}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form>
                                        <InputField
                                            type="text"
                                            name="fullName"
                                            labelName="Full Name"
                                            error={errors.fullName}
                                            touch={touched.fullName}
                                            placeHolder="Enter your full name"
                                        />
                                        <InputField
                                            type="email"
                                            name="email"
                                            labelName="Email"
                                            error={errors.email}
                                            touch={touched.email}
                                            placeHolder="Enter your email"
                                        />
                                        <InputField
                                            name="message"
                                            labelName="Message"
                                            touch={touched.message}
                                            error={errors.message}
                                            placeHolder="Write your message here..."
                                            as="textarea"
                                        />
                                        <FormButton
                                            type="submit"
                                            variant="primary"
                                            name="Send"
                                            className="submit-btn"
                                            isSubmitting={isSubmitting}
                                            isSubmittingClass={isSubmittingClass(
                                                isSubmitting
                                            )}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};
export default Contact;
