import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useBookNowTask } from "hooks/task/use-book--now-task";
import { useRouter } from "next/router";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { BookNowModalCardProps } from "types/bookNow";
import { ApplyFormData } from "utils/formData";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { applyTaskSchema } from "utils/formValidation/applyTaskFormValidation";
import { isSubmittingClass } from "utils/helpers";

const AppliedForm = ({
    service_id,
    title,
    budget_from,
    budget_to,
    budget_type,
    description,
    show,
    currency,
    setShow,
    handleClose,
}: BookNowModalCardProps) => {
    const router = useRouter();
    const {
        mutate,
        isLoading: applyTaskLoading,
        data: BookingData,
    } = useBookNowTask();

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
    interface ApplyTaskPayload {
        entity_service: string;
        description: string;
        budget_to: number;
    }
    const queryClient = useQueryClient();

    const taskDescription = description
        ? description.replace(/<[^>]+>/g, "")
        : "";

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
                                {currency?.code} &nbsp;
                                {budget_from ? budget_from + " - " : ""}
                                {budget_to}{" "}
                                {budget_type === "Hourly"
                                    ? "/hr"
                                    : budget_type === "Monthly"
                                    ? "/mn"
                                    : budget_type === "Daily"
                                    ? "/daily"
                                    : "/project"}
                            </span>
                        </h4>
                        <h4>
                            Description: <span> {taskDescription}</span>{" "}
                        </h4>
                    </div>
                    <Formik
                        initialValues={ApplyFormData}
                        validationSchema={applyTaskSchema}
                        onSubmit={async (values) => {
                            console.log("values are=", values);
                            const applyTaskPayload: ApplyTaskPayload = {
                                entity_service: service_id ?? "",
                                budget_to:
                                    parseInt(values.price) ?? parseInt(""),
                                description: values.remarks,
                                // pre_requisites: JSON.stringify(
                                //     values.prerequesties
                                // ),
                            };
                            console.log(
                                "🚀 ~ file: AppliedForm.tsx ~ line 107 ~ onSubmit={ ~ applyTaskPayload",
                                applyTaskPayload
                            );
                            mutate(applyTaskPayload, {
                                onSuccess: (data) => {
                                    toast.success(
                                        "You have successfully applied for task"
                                    );
                                    queryClient.invalidateQueries([
                                        "get-my-applicants",
                                    ]);
                                    queryClient.invalidateQueries([
                                        "my-requested-task",
                                    ]);
                                    queryClient.invalidateQueries([
                                        "get-task-applicants",
                                    ]);
                                    queryClient.invalidateQueries([
                                        "approved-task",
                                    ]);
                                    //toggleSuccessModal();
                                    setShow(false);
                                    router.push("/home");
                                },
                                onError: (error) => {
                                    // const errors = Object.values(
                                    //     error.response?.data.task ?? []
                                    // ).join("\n");
                                    toast.error(error.message);
                                    // toast.error(errors);
                                    // setShow(false);
                                    //
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
                                    placeHolder="Remarks ..."
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
export default AppliedForm;
