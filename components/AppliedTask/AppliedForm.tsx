import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Form, Formik } from "formik";
import type { ApplyTaskPayload } from "hooks/task/use-apply-task";
import { useApplyTask } from "hooks/task/use-apply-task";
import { useRouter } from "next/router";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { BookNowModalCardProps } from "types/bookNow";
import { ApplyFormData } from "utils/formData";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { isSubmittingClass } from "utils/helpers";

const AppliedForm = ({
    id,
    title,
    price,
    description,
    show,
    handleClose,
}: BookNowModalCardProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const router = useRouter();
    const { mutate } = useApplyTask();
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <p>{id}</p>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    <div className="applied-modal__details">
                        <h4>
                            Title: <span>{title}</span>
                        </h4>

                        <h4>
                            Price: <span>{price}</span>
                        </h4>
                        <p>{description}</p>
                    </div>

                    <hr />
                    <Formik
                        initialValues={ApplyFormData}
                        validationSchema={applyFormSchema}
                        onSubmit={async (values) => {
                            const price = parseInt(values.price, 10);
                            if (isNaN(price) || !id) {
                                return toast.error(
                                    "Price must be a number and task id must be provided"
                                );
                            }

                            const applyTaskPayload: ApplyTaskPayload = {
                                task: id,
                                charge: price,
                                pre_requisites: JSON.stringify(
                                    values.prerequesties
                                ),
                                remarks: values.remarks,
                            };
                            mutate(applyTaskPayload, {
                                onSuccess: (data) => {
                                    toast.success(data.task);
                                    toggleSuccessModal();
                                },
                                onError: (error) => {
                                    const errors = Object.values(
                                        error.response?.data.task ?? []
                                    ).join("\n");
                                    toast.error(errors);
                                },
                            });
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="w-25">
                                    <InputField
                                        type="number"
                                        name="price"
                                        labelName="Your Price"
                                        min="1"
                                        error={errors.price}
                                        touch={touched.price}
                                        placeHolder="Enter your price"
                                    />
                                </div>
                                <InputField
                                    name="remarks"
                                    labelName="Remarks"
                                    touch={touched.remarks}
                                    error={errors.remarks}
                                    placeHolder="Applying (Remark)"
                                    as="textarea"
                                />

                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn w-25"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>

                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        name="Apply"
                                        className="submit-btn w-25"
                                        isSubmitting={isSubmitting}
                                        isSubmittingClass={isSubmittingClass(
                                            isSubmitting
                                        )}
                                        onClick={() => {
                                            router.push("/task/checkout");
                                        }}
                                    />
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};
export default AppliedForm;
