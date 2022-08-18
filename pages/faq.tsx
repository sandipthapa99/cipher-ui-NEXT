import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import Layout from "@components/Layout";
import { Form, Formik } from "formik";
import type { GetStaticProps } from "next";
import { Fragment } from "react";
import { Accordion, Container } from "react-bootstrap";
import type { FAQTopicValueProps, FAQValueProps } from "types/faqValueProps";
import { axiosClient } from "utils/axiosClient";
import { FaqFormData } from "utils/contactFormData";
import { FaqFormSchema } from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface FAQData {
    faqData: FAQValueProps;
    faqTopicData: FAQTopicValueProps;
}

const FAQ = ({ faqData, faqTopicData }: FAQData) => {
    return (
        <Fragment>
            <Layout title="FAQs | Cipher">
                <section className="faq-page-header">
                    <BreadCrumb currentPage="FAQs" />
                    <Container fluid="xl">
                        <div className="faq-page-header__description">
                            <h1>We&apos;re here to help you</h1>
                            <h2>
                                With everything &amp; anything you&apos;re
                                confused about
                            </h2>
                        </div>
                    </Container>
                </section>
                <section className="faq-body-section">
                    <Container>
                        <section className="popular-faqs">
                            <h1>Popular FAQs</h1>
                            <Accordion flush>
                                {faqData?.result?.length > 0
                                    ? faqData?.result?.map((value, key) => (
                                          <Accordion.Item
                                              eventKey={key.toString()}
                                              key={key}
                                          >
                                              <Accordion.Header>
                                                  {value.title}
                                              </Accordion.Header>
                                              <Accordion.Body>
                                                  <p>{value.content}</p>
                                              </Accordion.Body>
                                          </Accordion.Item>
                                      ))
                                    : "No FAQ datas found"}
                            </Accordion>
                        </section>

                        <section className="faq-topics">
                            <h1>Topics</h1>
                            <Accordion flush>
                                {faqTopicData?.result?.length > 0
                                    ? faqTopicData?.result?.map(
                                          (value, key) => (
                                              <Accordion.Item
                                                  eventKey={key.toString()}
                                                  key={key}
                                              >
                                                  <Accordion.Header>
                                                      {value.topic}
                                                  </Accordion.Header>
                                                  <Accordion.Body>
                                                      <div className="inner-accordion">
                                                          <Accordion flush>
                                                              {faqData?.result
                                                                  ?.filter(
                                                                      (item) =>
                                                                          item.topic ===
                                                                          value.topic
                                                                  )
                                                                  .map(
                                                                      (
                                                                          value,
                                                                          key
                                                                      ) => (
                                                                          <Accordion.Item
                                                                              eventKey={key.toString()}
                                                                              key={
                                                                                  key
                                                                              }
                                                                          >
                                                                              <Accordion.Header>
                                                                                  {
                                                                                      value.title
                                                                                  }
                                                                              </Accordion.Header>
                                                                              <Accordion.Body>
                                                                                  <p>
                                                                                      {
                                                                                          value.content
                                                                                      }
                                                                                  </p>
                                                                              </Accordion.Body>
                                                                          </Accordion.Item>
                                                                      )
                                                                  )}
                                                          </Accordion>
                                                      </div>
                                                  </Accordion.Body>
                                              </Accordion.Item>
                                          )
                                      )
                                    : "No FAQ datas found"}
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
                                    console.log(values);
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
                                                isSubmittingClass={isSubmittingClass(
                                                    isSubmitting
                                                )}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </Container>
                </section>
            </Layout>
        </Fragment>
    );
};
export default FAQ;

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: faqData } = await axiosClient.get("/support/faq/");
        const { data: faqTopicData } = await axiosClient.get(
            "/support/faq-topic/"
        );
        return {
            props: {
                faqData,
                faqTopicData,
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                faqData: [],
                faqTopicData: [],
            },
            revalidate: 10,
        };
    }
};
