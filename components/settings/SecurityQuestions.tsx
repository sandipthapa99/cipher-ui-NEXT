import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Field, Form, Formik } from "formik";
import { useChangePassword } from "hooks/profile/changePassword/useChangePassword";
import { usePostSecurity } from "hooks/security/use-post-security";
import { useData } from "hooks/use-data";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";
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
    const sendSecurityQuestions = useMutation((data: any) => {
        return axiosClient.post("/tasker/security-answer/", data);
    });
    const { data: answeredSecurityQuestions } = useData<
        Array<{
            question: { id: number; question: string };
            answer: string;
        }>
    >(["answered-security-questions"], "/tasker/security-answer/");
    // console.log("abc", answeredSecurityQuestions);

    const renderQuestionsOptions = securityQuestions?.data?.map(
        (item, index) => {
            return {
                id: index,
                label: item?.question,
                value: item?.id,
            };
        }
    );
    const answeredQuestions = answeredSecurityQuestions?.data?.map(
        (item, index) => {
            return (
                <li className="m-2" key={index}>{`${index + 1}.${" "} ${
                    item?.question?.question
                }`}</li>
            );
        }
    );

    // const renderSecurityQuestions = securityQuestions?.data?.map(
    //     (question: any, index: number) => {
    //         return (
    //             <div key={index}>
    //                 {/* <InputField
    //                     type="text"
    //                     name={question?.id.toSting()}
    //                     labelName={question.question}
    //                     placeholder="Answer these questions"
    //                     fieldRequired
    //                 /> */}

    //                 <InputField
    //                     type="text"
    //                     name={question.id.toString()}
    //                     labelName={question.question}
    //                     placeholder="Answer your security question"
    //                     required={true}
    //                 />
    //             </div>
    //         );
    //     }
    // );

    return (
        <>
            {/* <div className="d-flex justify-content-between security-toggle mt-0">
                <p className="">Security Question</p>
                <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div> */}
            {/* <p className="mb-3 d-flex align-content-center"> */}
            {/* <Field
                    type="checkbox"
                    name="toggle"
                    className="checkbox me-2"
                />{" "} */}
            {/* Enabled
            </p> */}
            {/* <p className="">Security Question</p> */}
            <p>Answer a question you choose to confirm it&apos;s you.</p>
            <Formik
                initialValues={{
                    question: "",
                    answer: "",
                }}
                onSubmit={async (values, action) => {
                    // console.log(values);
                    sendSecurityQuestions.mutate(values, {
                        onSuccess: () => {
                            toast.success("Security questions Answered");
                        },
                        onError: (error: any) => {
                            toast.error(error.message);
                        },
                    });

                    // Object.entries(values).forEach((value) => {
                    //     const [key, keyValue] = value;
                    //     const newValues = {
                    //         question: parseInt(key) as number,
                    //         answer: keyValue as string,
                    //     };

                    //     securityMutate(newValues, {
                    //         onSuccess: () => {
                    //             toast.success("Security question Added");
                    //             action.resetForm();
                    //         },
                    //         onError: (err) => {
                    //             toast.error(err.message);
                    //         },
                    //     });
                    // });

                    // const newValues = { question:, answer };
                }}
            >
                {({ isSubmitting, resetForm, touched, errors }) => (
                    <Form autoComplete="off">
                        {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
                        {/* {securityQuestions && renderSecurityQuestions} */}
                        <SelectInputField
                            name="question"
                            labelName="Select questions"
                            touch={touched.question}
                            error={errors.question}
                            placeHolder="Select Question"
                            options={renderQuestionsOptions}
                            fieldRequired
                        />

                        <InputField
                            type="text"
                            name="answer"
                            labelName="Answer"
                            touch={touched.answer}
                            error={errors.answer}
                            placeholder="Answer your security question"
                            required={true}
                            fieldRequired
                        />
                        <div>
                            <p className="m-1">Answered Questions</p>
                            <ol>{answeredQuestions}</ol>
                        </div>

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
                                name="Answer"
                                className="submit-btn"
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
