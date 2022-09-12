import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { createStyles, LoadingOverlay } from "@mantine/core";
import { Form, Formik } from "formik";
import type { ApplyTaskPayload } from "hooks/task/use-apply-task";
import { useApplyTask } from "hooks/task/use-apply-task";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useToggleSuccessModal } from "store/use-success-modal";
import type { BookNowModalCardProps } from "types/bookNow";
import { ApplyFormData } from "utils/formData";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { isSubmittingClass } from "utils/helpers";

const AppliedForm = ({
    service_id,
    title,
    budget_from,
    budget_to,
    budget_type,
    description,
    show,
    setShow,
    handleClose,
}: BookNowModalCardProps) => {
    const toggleSuccessModal = useToggleSuccessModal();
    const router = useRouter();
    const { mutate, isLoading: applyTaskLoading } = useApplyTask();
    const { classes } = useStyles();

    // const loadingOverlayVisible = useMemo(
    //     () => applyTaskLoading,
    //     [applyTaskLoading]
    // );

    // if (loadingOverlayVisible)
    //     return (
    //         <LoadingOverlay
    //             visible={loadingOverlayVisible}
    //             className={classes.overlay}
    //             overlayBlur={2}
    //         />
    //     );
    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    <div className="applied-modal__details">
                        <h4>
                            Title: <span>{title}</span>
                        </h4>

                        <h4>
                            Price:{" "}
                            <span>
                                {budget_from}
                                {budget_to && "-" + budget_to}
                                {budget_type}
                            </span>
                        </h4>
                        <p>{description}</p>
                    </div>
                    <Formik
                        initialValues={ApplyFormData}
                        validationSchema={applyFormSchema}
                        onSubmit={async (values) => {
                            const price = parseInt(values.price, 10);
                            if (isNaN(price) || !service_id) {
                                return toast.error(
                                    "Price must be a number and task id must be provided"
                                );
                            }

                            const applyTaskPayload: ApplyTaskPayload = {
                                task: service_id,
                                charge: price,
                                pre_requisites: JSON.stringify(
                                    values.prerequesties
                                ),
                                remarks: values.remarks,
                            };
                            mutate(applyTaskPayload, {
                                onSuccess: (data) => {
                                    toast.success(
                                        "You have successfully applied for task"
                                    );
                                    //toggleSuccessModal();
                                    setShow(false);
                                    router.push("/task/checkout");
                                },
                                onError: (error) => {
                                    const errors = Object.values(
                                        error.response?.data.task ?? []
                                    ).join("\n");
                                    toast.error(errors);
                                    setShow(false);
                                    console.log("error", errors);
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
                                        // onClick={() => {
                                        //     router.push("/task/checkout");
                                        // }}
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
const useStyles = createStyles(() => ({
    overlay: {
        postion: "fixed",
        inset: 0,
        zIndex: 9999,
    },
}));
export default AppliedForm;
