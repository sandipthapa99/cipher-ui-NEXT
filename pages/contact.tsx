import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import Layout from "@components/Layout";
import {
    faFacebookF,
    faGoogle,
    faInstagram,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LocationOnOutlined, PhoneIphoneOutlined } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useContact } from "hooks/contact-and-support/contact";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { ContactFormData } from "utils/contactFormData";
import contactFormSchema from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

const Contact = () => {
    const { mutate } = useContact();

    return (
        <Layout
            title="Contact Us | Homaale"
            description="Contact us for any query. We value your  query and feedback."
            keywords="homaale, airtasker-nepali, nepali-working-platform  contact"
        >
            <section className="contact-page-header">
                <BreadCrumb currentPage="Contact Us" />
                <Container fluid="xl">
                    <div className="contact-page-header__description">
                        <h1>Reach us out.</h1>
                        {/* <h2>
                            With everything &amp; anything you&apos;re confused
                            about
                        </h2> */}
                    </div>
                </Container>
            </section>
            <section className="contact-page-form">
                <Container>
                    <Row className="gx-5">
                        <Col md={6} className="left-block">
                            <div className="contact-block address">
                                <LocationOnOutlined className="svg-icon location" />
                                <a>
                                    Dhobi Khola, Buddhanagar, Kathmandu, Nepal
                                </a>
                            </div>

                            <div className="contact-block phone">
                                <PhoneIphoneOutlined className="svg-icon phone" />
                                <Link href="tel:1234567890">
                                    <a>+977 9805674418</a>
                                </Link>
                            </div>

                            <div className="contact-block social-sites">
                                <div className="social-item">
                                    <FontAwesomeIcon
                                        icon={faFacebookF}
                                        className="svg-icon facebook"
                                    />
                                    <Link href="https://www.facebook.com/people/homaale/100086263383456/?mibextid=ZbWKwL">
                                        <a>Facebook</a>
                                    </Link>
                                </div>
                                <div className="social-item">
                                    <FontAwesomeIcon
                                        icon={faTwitter}
                                        className="svg-icon twitter"
                                    />
                                    <Link href="https://twitter.com/homaaleservices">
                                        <a>Twitter</a>
                                    </Link>
                                </div>
                                <div className="social-item">
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        className="svg-icon google"
                                    />
                                    <Link href="https://instagram.com/homaaleservices">
                                        <a>Instagram</a>
                                    </Link>
                                </div>
                                <div className="social-item">
                                    <FontAwesomeIcon
                                        icon={faGoogle}
                                        className="svg-icon google"
                                    />
                                    <Link href="mailto:https://info@homaale.com">
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
                                onSubmit={async (values, action) => {
                                    mutate(values, {
                                        onSuccess: async () => {
                                            toast.success(
                                                " Contact message sent successfully"
                                            );
                                            action.resetForm();
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
                                            name="full_name"
                                            labelName="Full Name"
                                            error={errors.full_name}
                                            touch={touched.full_name}
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
