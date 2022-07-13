import Breadcrum from "@components/common/Breadcrum";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import Layout from "@components/Layout";
import { Form, Formik } from "formik";
import { Accordion, Container } from "react-bootstrap";
import { FaqFormData } from "utils/contactFormData";
import { FaqFormSchema } from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";

const FAQ = () => {
    return (
        <>
            <Layout
                title="FAQs | Cipher">
                <section className="faq-page-header">
                    <Breadcrum currentPage="FAQs" />
                    <Container>
                        <div className="faq-page-header__description">
                            <h1>We&apos;re here to help you</h1>
                            <h2>With everything &amp; anything you&apos;re confused about</h2>
                        </div>
                    </Container>
                </section>
                <section className="faq-body-section">
                    <Container>
                        <section className="popular-faqs">
                            <h1>Popular FAQs</h1>
                            <Accordion flush>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        What is Cipher?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            With Cagtu, a custom app development project starts with you preparing and then submitting a request for proposal, also referred to as an RFP(request for proposal). It will help us create a tailored, individualised response.
                                        </p>

                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        How long does the project take?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            The implementation time depends on the type of order, the technology chosen, and the amount of work that needs to be done. We always try to establish a realistic time frame for completing the project. Most MVP (Minimum Viable Product) versions are implemented within 2-4 months of signing the contract. Also, we develop projects through long-term collaboration plans that have no end date.
                                        </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        How do you provide project estimates? What are the modes of communication that you use?
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <p>
                                            Team Cagtu carries out scoping and estimation for our customers&apos; projects through the tools developed in-house. We can schedule a call, proceed with email communication, or stay in contact through any instant messenger convenient to you.
                                            If all the specialists required for your project are available, we start the work as soon as possible, or even immediately.

                                        </p>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </section>

                        <section className="faq-topics">
                            <h1>Topics</h1>
                            <Accordion flush>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        Account
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="inner-accordion">
                                            <Accordion flush>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        What is Cipher?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            With Cagtu, a custom app development project starts with you preparing and then submitting a request for proposal, also referred to as an RFP(request for proposal). It will help us create a tailored, individualised response.
                                                        </p>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        How long does the project take?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            The implementation time depends on the type of order, the technology chosen, and the amount of work that needs to be done. We always try to establish a realistic time frame for completing the project. Most MVP (Minimum Viable Product) versions are implemented within 2-4 months of signing the contract. Also, we develop projects through long-term collaboration plans that have no end date.
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="3">
                                                    <Accordion.Header>
                                                        How do you provide project estimates? What are the modes of communication that you use?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            Team Cagtu carries out scoping and estimation for our customers&apos; projects through the tools developed in-house. We can schedule a call, proceed with email communication, or stay in contact through any instant messenger convenient to you.
                                                            If all the specialists required for your project are available, we start the work as soon as possible, or even immediately.

                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        Subscription
                                    </Accordion.Header>
                                    <Accordion.Body>
                                    <div className="inner-accordion">
                                            <Accordion flush>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        What is Cipher?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            With Cagtu, a custom app development project starts with you preparing and then submitting a request for proposal, also referred to as an RFP(request for proposal). It will help us create a tailored, individualised response.
                                                        </p>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        How long does the project take?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            The implementation time depends on the type of order, the technology chosen, and the amount of work that needs to be done. We always try to establish a realistic time frame for completing the project. Most MVP (Minimum Viable Product) versions are implemented within 2-4 months of signing the contract. Also, we develop projects through long-term collaboration plans that have no end date.
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="3">
                                                    <Accordion.Header>
                                                        How do you provide project estimates? What are the modes of communication that you use?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            Team Cagtu carries out scoping and estimation for our customers&apos; projects through the tools developed in-house. We can schedule a call, proceed with email communication, or stay in contact through any instant messenger convenient to you.
                                                            If all the specialists required for your project are available, we start the work as soon as possible, or even immediately.

                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        Features
                                    </Accordion.Header>
                                    <Accordion.Body>
                                    <div className="inner-accordion">
                                            <Accordion flush>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        What is Cipher?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            With Cagtu, a custom app development project starts with you preparing and then submitting a request for proposal, also referred to as an RFP(request for proposal). It will help us create a tailored, individualised response.
                                                        </p>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        How long does the project take?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            The implementation time depends on the type of order, the technology chosen, and the amount of work that needs to be done. We always try to establish a realistic time frame for completing the project. Most MVP (Minimum Viable Product) versions are implemented within 2-4 months of signing the contract. Also, we develop projects through long-term collaboration plans that have no end date.
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="3">
                                                    <Accordion.Header>
                                                        How do you provide project estimates? What are the modes of communication that you use?
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <p>
                                                            Team Cagtu carries out scoping and estimation for our customers&apos; projects through the tools developed in-house. We can schedule a call, proceed with email communication, or stay in contact through any instant messenger convenient to you.
                                                            If all the specialists required for your project are available, we start the work as soon as possible, or even immediately.

                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </section>
                    </Container>
                </section>
                <section className="faq-form-section">
                    <Container>
                        <div className="faq-form">
                            <h1>Still Stuck?</h1>
                            <h2>How can we help?</h2>
                            <Formik
                                initialValues={FaqFormData}
                                validationSchema={FaqFormSchema}
                                onSubmit={async (values) => {
                                    console.log(values)
                                }}
                            >
                                {({
                                    isSubmitting,
                                    errors,
                                    touched
                                }) => (
                                    <Form>
                                        <InputField
                                            type="text"
                                            name="fullName"
                                            labelName="Full Name"
                                            error={errors.fullName}
                                            touch={touched.fullName}
                                            placeHolder="Full Name"
                                        />
                                        <InputField
                                            type="email"
                                            name="email"
                                            labelName="Email"
                                            error={errors.email}
                                            touch={touched.email}
                                            placeHolder="Email address"
                                        />
                                        <InputField
                                            type="text"
                                            name="phoneNumber"
                                            labelName="Phone Number"
                                            error={errors.phoneNumber}
                                            touch={touched.phoneNumber}
                                            placeHolder="Phone Number"
                                        />
                                        <InputField
                                            name="message"
                                            labelName="What can we help you with?"
                                            error={errors.message}
                                            touch={touched.message}
                                            placeHolder="Go ahead we are listening"
                                            as="textarea"
                                        />
                                        <div className="faq-btn d-flex justify-content-center align-items-center">
                                            <FormButton
                                                type="submit"
                                                variant="primary"
                                                name="Submit"
                                                className="submit-btn"
                                                isSubmitting={isSubmitting}
                                                isSubmittingClass={isSubmittingClass(isSubmitting)}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                    </Container>
                </section>
            </Layout>
        </>
    )
}
export default FAQ;