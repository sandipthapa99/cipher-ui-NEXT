import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import Layout from "@components/Layout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useData } from "hooks/use-data";
import { useForm } from "hooks/use-form";
import type { GetStaticProps } from "next";
import { Fragment } from "react";
import { Accordion, Container } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import type {
    FAQTopicValueProps,
    FAQValueProps,
    FAQValuePropsAll,
} from "types/faqValueProps";
import { axiosClient } from "utils/axiosClient";
import { FaqFormData } from "utils/contactFormData";
import { FaqFormSchema } from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

interface FAQData {
    faqData: FAQValueProps;
    faqTopicData: FAQTopicValueProps;
}

const FAQ = ({ faqTopicData }: FAQData) => {
    const { data: faqData } = useData<FAQValueProps>(
        ["all-faq"],
        "/support/faq/"
    );

    const { data: topicData } = useData<FAQValuePropsAll[]>(
        ["topic-faqs"],
        "support/faq/?page=-1"
    );

    const { mutate } = useForm("/support/contactus/");
    const toggleSuccessModal = useToggleSuccessModal();
    return (
        <Fragment>
            <Layout title="FAQs | Homaale">
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
                            <h1>Mostly Asked FAQs</h1>
                            <Accordion flush>
                                {(faqData?.data?.result ?? []).length > 0
                                    ? faqData?.data?.result?.map(
                                          (value, key) => (
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
                                          )
                                      )
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
                                                              {topicData?.data
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
                                onSubmit={async (values, action) => {
                                    mutate(values, {
                                        onSuccess: async () => {
                                            toggleSuccessModal();
                                            action.resetForm();
                                        },
                                        onError: (error) => {
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
                                        <PhoneNumberInput
                                            name={"phone"}
                                            labelName="Phone Number"
                                            touch={touched.phone}
                                            error={errors.phone}
                                            placeHolder={
                                                "Enter your Phone Number"
                                            }
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
        const queryClient = new QueryClient();
        await queryClient.prefetchQuery(["all-faq"]);
        const { data: faqTopicData } = await axiosClient.get(
            "/support/faq-topic/"
        );
        return {
            props: {
                faqData,
                faqTopicData,
                dehydratedState: dehydrate(queryClient),
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
