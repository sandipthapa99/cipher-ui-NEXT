import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    return(
        <>
        <footer id="site-footer" className="site-footer">
                <Container>
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
                                        onSubmit={async(values, actions) => {
                                            console.log(values, actions)
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
                                                <button
                                                    type="submit"
                                                    className="btn"
                                                    disabled={isSubmitting}
                                                >
                                                    <FontAwesomeIcon icon={faArrowRight} className="svg-icon" />
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Col>
                            </Row>
                        </div>
                    
                </Container>
            </footer>
        </>
    )
}
export default Footer;