import { BreadCrumb } from "@components/common/BreadCrumb";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useSupport } from "hooks/support/useSupport";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";
import { SupportFormData } from "utils/contactFormData";
import { SupportFormSchema } from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";

const Support = () => {
    const { data } = useQuery(["support-tickets"], async () => {
        return axiosClient.get("/support/support-ticket-type/options/");
    });

    const renderIssueTypes = data?.data?.map((item: any) => {
        return {
            label: item?.name,
            value: item?.id,
            id: item?.id,
        };
    });

    const { mutate } = useSupport();

    return (
        <>
            <Layout title="Feedback | Homaale">
                <BreadCrumb currentPage="Feedback" />

                <section className="site-feedback">
                    <Container fluid="xl">
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
                                    onSubmit={async (values, action) => {
                                        mutate(values, {
                                            onSuccess: () => {
                                                toast.success(
                                                    "Successfully submitted"
                                                );
                                                action.resetForm();
                                            },
                                            onError: (error) => {
                                                toast.error(error?.message);
                                            },
                                        });
                                    }}
                                >
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form>
                                            <InputField
                                                type="text"
                                                name="full_name"
                                                labelName="Your Name"
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
                                            <PhoneNumberInput
                                                name={"phone"}
                                                labelName="Phone Number"
                                                touch={touched.phone}
                                                error={errors.phone}
                                                placeHolder={
                                                    "Enter your Phone Number"
                                                }
                                            />
                                            <SelectInputField
                                                name="type"
                                                placeHolder="Technical"
                                                labelName="Issue Type"
                                                options={renderIssueTypes}
                                                // fieldRequired
                                            />
                                            <InputField
                                                name="reason"
                                                labelName="Message"
                                                touch={touched.reason}
                                                error={errors.reason}
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
        </>
    );
};
export default Support;
