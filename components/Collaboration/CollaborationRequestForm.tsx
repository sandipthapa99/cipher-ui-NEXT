import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { ApplyFormData } from "utils/formData";

import { CollaborateWith } from "./CollaborateWith";

interface CollaborationRequestFormProps {
    show: boolean;
    handleClose: () => void;
}

export const CollaborationRequestForm = ({
    show,
    handleClose,
}: CollaborationRequestFormProps) => {
    const initialValues = {
        hourly_rate: "",
        message: "",
        prerequesties: [],
    };
    return (
        <div className="collaboration-request-form">
            <Modal
                show={show}
                onHide={handleClose}
                className="collaboration-request-modal"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="title-section">
                        <h3>Request for Collaboration</h3>
                        <h5>
                            Title: <span>Need a garden cleaner</span>
                        </h5>
                        <h5 className="budget">
                            Budget: <span>Rs 200/hr</span>
                        </h5>
                        <p>
                            Hiring a reputable professional landscape gardener
                            entail paying for their knowledge, experience, time,
                            equipment, and materials. They will be able to
                            discuss your vision and tailor your garden design to
                            your exact needs, taking into account your taste,
                            lifestyle, budget.
                        </p>
                    </div>

                    <div className="form-section">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (values) => {
                                console.log(values);
                            }}
                        >
                            {({ setFieldValue, errors }) => {
                                return (
                                    <Form>
                                        <span className="hourly-rate-input">
                                            <InputField
                                                labelName="Hourly Rate"
                                                name={"hourly_rate"}
                                                placeHolder="$ 15 /hr"
                                                type="number"
                                            />
                                        </span>

                                        <InputField
                                            name="message"
                                            labelName="Message"
                                            placeHolder="Your role in project"
                                            as="textarea"
                                        />

                                        <AddRequirements
                                            onSubmit={(requirements) =>
                                                setFieldValue(
                                                    "prerequesties",
                                                    requirements
                                                )
                                            }
                                            title="Pre-requisites"
                                            description="This helps merchants to find about your requirements better."
                                        />
                                        <CollaborateWith />

                                        <div className="d-flex justify-content-center button-section">
                                            <span className="cancel-button">
                                                <BigButton
                                                    btnTitle={"Cancel"}
                                                    backgroundColor={"white"}
                                                />
                                            </span>
                                            <FormButton name={"Request"} />
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
