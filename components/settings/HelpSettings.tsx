import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import urls from "constants/urls";
import { Form, Formik } from "formik";
import { usePostHelp } from "hooks/help/use-post-help";
import { useData } from "hooks/use-data";
import Link from "next/link";
import React from "react";
import { Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { HelpandSupport } from "utils/formValidation/helpandsupport";
import { isSubmittingClass } from "utils/helpers";

const HelpSettings = () => {
    const { mutate } = usePostHelp();
    const { data } = useData<
        Array<{
            id: number;
            topic: string;
        }>
    >(["topic-help"], urls.support.helpTopics);
    const dropdownReportOptions = data?.data.map((item) => {
        return {
            id: item.id,
            label: item.topic,
            value: item.topic.split(" ").join("")?.toLowerCase(),
        };
    });

    return (
        <div className="account-form">
            <h2>Help & Legal</h2>
            <Formik
                initialValues={{
                    reason: "",
                    details: "",
                    topic: "",
                }}
                validationSchema={HelpandSupport}
                onSubmit={(val, action) => {
                    const newValues = {
                        details: val.details,
                        reason: val.topic !== "other" ? val.topic : "other",
                        topic: data?.data.find(
                            (item) =>
                                item.topic
                                    .split(" ")
                                    .join("")
                                    ?.toLowerCase() === val.topic
                        )?.id,
                    };

                    mutate(newValues, {
                        onSuccess: () => {
                            toast.success("Your help request has been sent");
                            action.resetForm();
                        },
                        onError: (error) => {
                            toast.error(error.message);
                        },
                    });
                }}
            >
                {({ isSubmitting, errors, touched, values }) => (
                    <Form>
                        <Row>
                            <SelectInputField
                                name="topic"
                                labelName="Report a problem"
                                fieldRequired={true}
                                touch={touched.topic}
                                error={errors.topic}
                                placeHolder="Select Report Type"
                                options={dropdownReportOptions}
                            />
                        </Row>
                        <Row>
                            {values.topic === "other" && (
                                <InputField
                                    name="reason"
                                    labelName="Please specify a problem"
                                    error={errors.reason}
                                    touch={touched.reason}
                                    placeHolder="Specify your reason here."
                                />
                            )}
                        </Row>
                        <Row>
                            <InputField
                                as="textarea"
                                name="details"
                                min="3"
                                error={errors.details}
                                touch={touched.details}
                                placeHolder="Please explain your problem briefly"
                            />
                        </Row>

                        <div className="d-flex justify-content-end">
                            <FormButton
                                type="submit"
                                variant="primary"
                                name="Submit"
                                className="submit-btn w-25"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(
                                    isSubmitting
                                )}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
            <hr style={{ marginTop: "4rem" }} />
            <div className="help-support">
                <p className="help-support-text">Terms and Policies Link</p>
                <Link href={"#"} className="help-support-link">
                    Privacy Policy for HOMAALE
                </Link>
                <Link href={"#"} className="help-support-link">
                    Other Privcy Policies link
                </Link>
            </div>
        </div>
    );
};

export default HelpSettings;
