import { BreadCrumb } from "@components/common/BreadCrumb";
import { CustomDropZone } from "@components/common/CustomDropZone";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import PhoneNumberInput from "@components/common/PhoneNumberInput";
import ReCaptchaV3 from "@components/common/ReCaptchaV3";
import SelectInputField from "@components/common/SelectInputField";
import Layout from "@components/Layout";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useUser } from "hooks/auth/useUser";
import { useSupport } from "hooks/support/useSupport";
import { useUploadFile } from "hooks/use-upload-file";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { SupportFormData } from "utils/contactFormData";
import { SupportFormSchema } from "utils/formValidation/contactFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

const Support = () => {
    const { data } = useQuery(["support-tickets"], async () => {
        return axiosClient.get("support/support-ticket-type/options/");
    });

    const { mutateAsync } = useUploadFile();
    const renderIssueTypes = data?.data?.map((item: any) => {
        return {
            label: item?.name,
            value: item?.id,
            id: item?.id,
        };
    });

    const { data: userData } = useUser();

    const { mutate, isLoading } = useSupport();
    const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

    const [token, setToken] = useState("");
    const queryClient = new QueryClient();
    const router = useRouter();

    return (
        <>
            <Layout
                title="Feedback | Homaale"
                description="Homaale is a platform designed to provide service booking solutions to the
            service seekers and business opportunities to various service providing companies by bridging a gap between them. 
             It covers a wide range of services from various industries like Accounting, Gardening,
            Health, Beauty, and many more."
                keywords="homaale, airtasker-nepali,nepali-working-platform, business, online-business"
            >
                <BreadCrumb currentPage="Support" />

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
                                    validationSchema={SupportFormSchema(
                                        userData
                                    )}
                                    onSubmit={async (values, action) => {
                                        const formData = new FormData();

                                        const imageIds = await mutateAsync({
                                            files: values.attachment,
                                        });

                                        formData.append(
                                            "g_recaptcha_response",
                                            token
                                        );
                                        const newData = {
                                            ...values,
                                            attachment: imageIds,
                                            g_recaptcha_response: token,
                                        };
                                        mutate(newData, {
                                            onSuccess: () => {
                                                queryClient.invalidateQueries([
                                                    "my-tickets",
                                                ]);
                                                toast.success(
                                                    "Successfully submitted"
                                                );

                                                action.resetForm();
                                                router.push("/my-tickets");
                                            },
                                            onError: (error) => {
                                                toast.error(error?.message);
                                            },
                                        });
                                    }}
                                >
                                    {({
                                        isSubmitting,
                                        errors,
                                        touched,
                                        setFieldValue,
                                    }) => (
                                        <Form>
                                            {!userData && (
                                                <>
                                                    <InputField
                                                        type="text"
                                                        name="full_name"
                                                        labelName="Your Name"
                                                        error={errors.full_name}
                                                        touch={
                                                            touched.full_name
                                                        }
                                                        placeHolder="Enter your full name"
                                                        fieldRequired
                                                    />
                                                    <InputField
                                                        type="email"
                                                        name="email"
                                                        labelName="Email"
                                                        error={errors.email}
                                                        touch={touched.email}
                                                        placeHolder="Enter your email"
                                                        fieldRequired
                                                    />
                                                    <PhoneNumberInput
                                                        name={"phone"}
                                                        labelName="Phone Number"
                                                        touch={touched.phone}
                                                        error={errors.phone}
                                                        placeHolder={
                                                            "Enter your Phone Number"
                                                        }
                                                        fieldRequired
                                                    />
                                                </>
                                            )}

                                            <SelectInputField
                                                name="type"
                                                placeHolder="Select an Issue Type"
                                                labelName="Issue Type"
                                                options={renderIssueTypes}
                                                fieldRequired
                                            />
                                            <InputField
                                                name="reason"
                                                labelName="Message"
                                                touch={touched.reason}
                                                error={errors.reason}
                                                placeHolder="Write your message here..."
                                                as="textarea"
                                                fieldRequired
                                            />
                                            <CustomDropZone
                                                accept={IMAGE_MIME_TYPE}
                                                fileType="image"
                                                sx={{ maxWidth: "30rem" }}
                                                name="attachment"
                                                onDrop={(images) =>
                                                    setFieldValue(
                                                        "attachment",
                                                        images
                                                    )
                                                }
                                            />

                                            <ReCaptchaV3
                                                refresher={refreshReCaptcha}
                                                render={(token) =>
                                                    setToken(token)
                                                }
                                            />
                                            <FormButton
                                                type="submit"
                                                variant="primary"
                                                name="Send"
                                                className="submit-btn mt-5"
                                                isLoading={isLoading}
                                                isSubmitting={isSubmitting}
                                                isSubmittingClass={isSubmittingClass(
                                                    isSubmitting
                                                )}
                                                onClick={() =>
                                                    setRefreshReCaptcha(true)
                                                }
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
