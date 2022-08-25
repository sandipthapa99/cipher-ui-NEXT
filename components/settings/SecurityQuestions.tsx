import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useChangePassword } from "hooks/profile/changePassword/useChangePassword";
import { usePostSecurity } from "hooks/security/use-post-security";
import { useData } from "hooks/use-data";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { ChangePasswordFromData } from "utils/formData";
import changePasswordFormSchema from "utils/formValidation/changePasswordFormValidation";
import { isSubmittingClass } from "utils/helpers";

export const SecurityQuestions = () => {
    const { mutate } = useChangePassword();
    const { mutate: securityMutate, isLoading } = usePostSecurity();

    const { data: securityQuestions } = useData<
        Array<{ id: number; question: string }>
    >(["security-questions"], "/tasker/cms/security-question/");
    console.log(securityQuestions);

    const renderSecurityQuestions = securityQuestions?.data?.map(
        (question: any, index: number) => {
            return (
                <div key={index}>
                    <InputField
                        type="text"
                        name={question.id.toString()}
                        labelName={question.question}
                        placeholder="Answer"
                        required={true}
                    />
                </div>
            );
        }
    );

    return (
        <>
            <div className="d-flex justify-content-between security-toggle mt-5">
                <h2>Security Question</h2>
                <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            {/* <p className="mb-3 d-flex align-content-center"> */}
            {/* <Field
                    type="checkbox"
                    name="toggle"
                    className="checkbox me-2"
                />{" "} */}
            {/* Enabled
            </p> */}
            <p>Answer a question you choose to confirm it’s you.</p>
            <Formik
                initialValues={{}}
                onSubmit={async (values, action) => {
                    Object.entries(values).forEach((value) => {
                        const [key, keyValue] = value;
                        const newValues = {
                            question: parseInt(key) as number,
                            answer: keyValue as string,
                        };

                        securityMutate(newValues, {
                            onSuccess: () => {
                                toast.success("Security question Added");
                                action.resetForm();
                            },
                            onError: (err) => {
                                toast.error(err.message);
                            },
                        });
                    });

                    // const newValues = { question:, answer };
                }}
            >
                {({ isSubmitting, resetForm }) => (
                    <Form autoComplete="off">
                        {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                        {securityQuestions && renderSecurityQuestions}
                        <div className="d-flex justify-content-end ">
                            <Button
                                className="me-3 mb-0 cancel-btn"
                                onClick={() => resetForm}
                            >
                                Cancel
                            </Button>
                            <FormButton
                                type="submit"
                                variant="primary"
                                name="Add"
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
        </>
    );
};
