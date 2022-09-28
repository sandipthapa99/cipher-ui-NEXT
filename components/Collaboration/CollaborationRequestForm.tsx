import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import AddRequirements from "@components/PostTask/AddRequirements";
import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { useToggleSuccessModal } from "store/use-success-modal";
import { collaborationRequestFormSchema } from "utils/formValidation/CollaborationRequestFormValidation";

import { CollaborateWith } from "./CollaborateWith";

interface CollaborationRequestFormProps {
    show: boolean;
    handleClose: () => void;
}

export const CollaborationRequestForm = ({
    show,
    handleClose,
}: CollaborationRequestFormProps) => {
    const toggleSuccessModal = useToggleSuccessModal();

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
                backdrop="static"
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
                            validationSchema={collaborationRequestFormSchema}
                            onSubmit={async (values) => {
                                toggleSuccessModal();
                            }}
                        >
                            {({ setFieldValue, errors, touched }) => {
                                return (
                                    <Form>
                                        <span className="hourly-rate-input">
                                            <InputField
                                                labelName="Hourly Rate"
                                                name={"hourly_rate"}
                                                placeHolder="$ 15 /hr"
                                                error={errors.hourly_rate}
                                                touch={touched.hourly_rate}
                                                type="number"
                                                fieldRequired={true}
                                            />
                                        </span>

                                        <InputField
                                            name="message"
                                            labelName="Message"
                                            placeHolder="Your role in project"
                                            as="textarea"
                                            error={errors.message}
                                            touch={touched.message}
                                            fieldRequired={true}
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
                                                    handleClick={handleClose}
                                                />
                                            </span>
                                            <FormButton
                                                handleClick={handleClose}
                                                name={"Request"}
                                            />
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
