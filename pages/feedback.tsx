import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import type { FeedbackValuesProps } from "types/contact";
import { axiosClient } from "utils/axiosClient";
import { FeedbackFormData } from "utils/contactFormData";
import { FeedbackFormSchema } from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

const Feedback = () => {
    const { data } = useQuery(["feedback-category"], () => {
        return axiosClient.get("/support/feedback/category/options/");
    });
    const renderCategoryTypes = data?.data?.map(
        (item: { name: string; id: string }) => {
            return {
                label: item?.name,
                value: item?.id,
                id: item?.id,
            };
        }
    );

    const feedbackMutation = useMutation((data: FeedbackValuesProps) =>
        axiosClient.post("/support/feedback/", data)
    );

    const onSubmitFeedback = (data: any, actions: any) => {
        feedbackMutation.mutate(data, {
            onSuccess: (data) => {
                if (data?.data?.status === "failure") {
                    toast.error(data?.data?.message);
                } else {
                    toast.success(data?.data?.message);
                    actions.resetForm();
                }
            },
            onError: (error: any) => {
                toast.error(error);
                actions.resetForm();
            },
        });
    };
    return (
        <>
            <Layout
                title="Feedback | Homaale"
                description="Feel free to send us your feedbacks. We appreciate them."
                keywords="homaale-earn-money airtasker-nepali, nepali-working-platform, homaale-feeback, homaale,"
            >
                <Container fluid="xl" className="px-4">
                    <section className="site-feedback">
                        <Row className="gx-5">
                            <Col md={6} className="d-none d-md-flex">
                                <figure className="thumbnail-img">
                                    <Image
                                        src="/feedback.svg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="merchant-image"
                                    />
                                </figure>
                            </Col>
                            <Col md={6}>
                                <h1>Feedback</h1>
                                <p>
                                    Are you enjoying Homaale ? Send us your
                                    Feedbacks
                                </p>
                                <Formik
                                    initialValues={FeedbackFormData}
                                    validationSchema={FeedbackFormSchema}
                                    onSubmit={async (values, actions) => {
                                        onSubmitFeedback(values, actions);
                                    }}
                                >
                                    {({ isSubmitting, errors, touched }) => (
                                        <Form>
                                            <InputField
                                                type="text"
                                                name="subject"
                                                labelName="Subject"
                                                error={errors.subject}
                                                touch={touched.subject}
                                                placeHolder="Enter subject"
                                            />

                                            <SelectInputField
                                                name="feedback_category"
                                                fieldRequired={true}
                                                labelName="Category"
                                                placeHolder="Select Category"
                                                error={errors.feedback_category}
                                                touch={
                                                    touched.feedback_category
                                                }
                                                options={renderCategoryTypes}
                                            />

                                            <InputField
                                                name="description"
                                                labelName="Description"
                                                touch={touched.description}
                                                error={errors.description}
                                                placeHolder="Write your message here..."
                                                as="textarea"
                                            />
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
export default Feedback;
// function useFeedback(): { mutate: any; isLoading: any } {
//     throw new Error("Function not implemented.");
// }
