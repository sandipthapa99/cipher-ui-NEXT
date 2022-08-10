import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import { Form, Formik } from "formik";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { SupportFormData } from "utils/contactFormData";
import { SupportFormSchema } from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { issueTypes } from "utils/options";

const Support = () => {
    return (
        <>
            <Layout title="Feedback | Cipher">
                <BreadCrumb currentPage="Feedback" />
                <Container fluid="xl">
                    <section className="site-feedback">
                        <Row className="gx-5">
                            <Col md={6} className="d-none d-md-flex">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/support.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="merchant-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6}>
                                <h1>Support Form</h1>
                                <p>
                                    Any question or queries? Just write us a
                                    message
                                </p>
                                <Formik
                                    initialValues={SupportFormData}
                                    validationSchema={SupportFormSchema}
                                    onSubmit={async (values) => {
                                        console.log(values);
                                    }}
                                >
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form>
                                            <InputField
                                                type="text"
                                                name="fullName"
                                                labelName="Your Name"
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
                                                type="text"
                                                name="phone_number"
                                                labelName="Phone Number"
                                                touch={touched.phoneNumber}
                                                error={errors.phoneNumber}
                                                placeHolder="+00 420 420 4200"
                                            />
                                            <SelectInputField
                                                name="experience"
                                                placeHolder="Technical"
                                                labelName="Issue Type"
                                                options={issueTypes}
                                                // fieldRequired
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
                    </section>
                </Container>
            </Layout>
        </>
    );
};
export default Support;
