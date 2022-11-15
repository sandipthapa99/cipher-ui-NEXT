import FormButton from "@components/common/FormButton";
import PasswordField from "@components/common/PasswordField";
import { useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useDeleteAccount } from "hooks/use-post-delete";
import type { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";
import * as Yup from "yup";
interface PasswordModalCardProps {
    show?: boolean;
    handleClose?: () => void;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}
interface AuthProps {
    id?: number;
}

const PasswordModalCard = ({
    handleClose,
    show,
    id,
    setShowForm,
}: PasswordModalCardProps & AuthProps) => {
    const stringReqOnly = Yup.string().required("Required field");

    const passwordSchema = Yup.object().shape({
        password: stringReqOnly,
    });

    const { mutate } = useDeleteAccount(`/user/unlink/social/${id}/`);
    const queryClient = useQueryClient();
    return (
        <>
            {/* Modal component */}
            <Modal
                show={show}
                centered
                onHide={handleClose}
                className="auth-modal"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enter your Password.</Modal.Title>
                </Modal.Header>

                <div className="modal-body-content">
                    <Formik
                        initialValues={{ password: "" }}
                        validationSchema={passwordSchema}
                        onSubmit={async (values) => {
                            mutate(values, {
                                onSuccess: async (data: any) => {
                                    toast.success(data.message);
                                    queryClient.invalidateQueries([
                                        "linked-accounts",
                                    ]);
                                    setShowForm(false);
                                },
                                onError: () => {
                                    toast.error(
                                        "Password does not match. Please try again"
                                    );
                                },
                            });
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <PasswordField
                                    name="password"
                                    labelName="Password"
                                    touch={touched.password}
                                    error={errors.password}
                                    placeHolder="Password"
                                    fieldRequired
                                />
                                <Modal.Footer>
                                    <Button
                                        className="btn close-btn"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
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
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    );
};
export default PasswordModalCard;
