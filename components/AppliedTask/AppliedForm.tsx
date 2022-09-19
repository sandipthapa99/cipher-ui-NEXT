import FormButton from "@components/common/FormButton";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import {
    createStyles,
    LoadingOverlay,
    NumberInput,
    Space,
    Textarea,
} from "@mantine/core";
import { Form, Formik } from "formik";
import type { ApplyTaskPayload } from "hooks/task/use-apply-task";
import { useApplyTask } from "hooks/task/use-apply-task";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
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
    const router = useRouter();
    const { mutate, isLoading: isApplyTaskLoading } = useApplyTask();
    const { classes } = useStyles();
    return (
        <>
            <LoadingOverlay
                className={classes.overlay}
                visible={isApplyTaskLoading}
            />
            <Modal
                show={!isApplyTaskLoading && show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Task Details</h3>
                    <div className="applied-modal__details">
                        <h4>
                            Title : <span>{title}</span>
                        </h4>
                        <h4>
                            Price :
                            <span>
                                {budget_from && budget_to
                                    ? `From ${budget_to} to ${budget_from} / ${budget_type}`
                                    : budget_to
                                    ? `${budget_to}/${budget_type}`
                                    : "No budget info provided"}
                            </span>
                        </h4>
                        <p>{description}</p>
                    </div>
                    <Formik
                        initialValues={ApplyFormData}
                        validationSchema={applyFormSchema}
                        onSubmit={async (values) => {
                            if (!service_id) return;
                            const applyTaskPayload: ApplyTaskPayload = {
                                task: service_id,
                                charge: Number(values.price),
                                pre_requisites: JSON.stringify(
                                    values.prerequesties
                                ),
                                remarks: values.remarks,
                                recursion: 0,
                            };
                            mutate(applyTaskPayload, {
                                onSuccess: () => {
                                    setShow(false);
                                    toast.success(
                                        "You have successfully applied for task"
                                    );
                                    router.push("/task/checkout");
                                },
                                onError: (error) => {
                                    const errors = Object.values(
                                        error.response?.data ?? []
                                    ).join("\n");
                                    toast.error(errors);
                                },
                            });
                        }}
                    >
                        {({
                            isSubmitting,
                            errors,
                            touched,
                            setFieldValue,
                            getFieldProps,
                        }) => (
                            <Form>
                                <div className="w-25">
                                    <NumberInput
                                        required
                                        placeholder="Enter your price"
                                        label="Your price"
                                        error={
                                            touched.price && errors.price
                                                ? errors.price
                                                : ""
                                        }
                                        {...getFieldProps("price")}
                                        onChange={(value) =>
                                            setFieldValue("price", value)
                                        }
                                    />
                                    <Space h="md" />
                                    <NumberInput
                                        required
                                        label="Recursion"
                                        placeholder="Select number of recursion"
                                        error={
                                            touched.recursion &&
                                            errors.recursion
                                                ? errors.recursion
                                                : undefined
                                        }
                                        {...getFieldProps("recursion")}
                                        onChange={(value) =>
                                            setFieldValue("recursion", value)
                                        }
                                    />
                                </div>
                                <Space h="md" />
                                <Textarea
                                    required
                                    {...getFieldProps("remarks")}
                                    label="Remarks"
                                    placeholder="Enter your remarks"
                                    minRows={5}
                                    error={
                                        touched.remarks && errors.remarks
                                            ? errors.remarks
                                            : undefined
                                    }
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
