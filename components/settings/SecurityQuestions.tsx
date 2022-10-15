import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    dehydrate,
    QueryClient,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useData } from "hooks/use-data";
import { useEditForm } from "hooks/use-edit-form";
import type { GetStaticProps } from "next";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";
import { isSubmittingClass } from "utils/helpers";

export const SecurityQuestions = () => {
    const [openInput, setOpenInput] = useState(false);
    const [questionId, setQuestionId] = useState<number | undefined>();

    const queryClient = useQueryClient();
    const { data: securityQuestions } = useData<
        Array<{ id: number; question: string }>
    >(["security-questions"], "/tasker/cms/security-question/");

    const sendSecurityQuestions = useMutation((data: any) => {
        return axiosClient.post("/tasker/security-answer/", data);
    });
    const { data: answeredSecurityQuestions } = useData<
        Array<{
            question: { id: number; question: string };
            answer: string;
        }>
    >(["answered-security-questions"], "/tasker/security-answer/");

    const renderQuestionsOptions = securityQuestions?.data?.map(
        (item, index) => {
            return {
                id: index,
                label: item?.question,
                value: item?.id,
            };
        }
    );

    const [hovered, setHovered] = useState<null | number>(null);
    const { mutate: editAnswer } = useEditForm(
        `/tasker/security-answer/${questionId}/`
    );

    return (
        <div className="security-questions">
            <p>Answer a question you choose to confirm it&apos;s you.</p>
            <Formik
                initialValues={{
                    question: "",
                    answer: "",
                }}
                onSubmit={async (values, actions) => {
                    //
                    sendSecurityQuestions.mutate(values, {
                        onSuccess: () => {
                            toast.success("Security questions Answered");
                            queryClient.invalidateQueries([
                                "answered-security-questions",
                            ]);
                            actions.resetForm();
                        },
                        onError: (error: any) => {
                            toast.error(error.message);
                        },
                    });
                }}
            >
                {({ isSubmitting, resetForm, touched, errors }) => (
                    <Form autoComplete="off">
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
            <div>
                <p className="m-1">Answered Questions</p>
                {answeredSecurityQuestions?.data?.map((item, index) => {
                    return (
                        <>
                            <li key={index} className="d-flex m-2">
                                {`${index + 1}.${" "} ${
                                    item?.question?.question
                                }`}

                                <FontAwesomeIcon
                                    className="svg-icon"
                                    icon={faPencil}
                                    onClick={() => {
                                        setOpenInput(!openInput);
                                        setQuestionId(item.question.id);
                                        setHovered(item.question.id);
                                    }}
                                />
                            </li>
                            <Formik
                                initialValues={{
                                    answer: item?.answer,
                                }}
                                onSubmit={async (values, action) => {
                                    editAnswer(values, {
                                        onSuccess: () => {
                                            toast.success(
                                                "Security questions Updated"
                                            );
                                            queryClient.invalidateQueries([
                                                "answered-security-questions",
                                            ]);
                                            setOpenInput(false);
                                        },
                                        onError: (error: any) => {
                                            toast.error(error.message);
                                        },
                                    });
                                }}
                            >
                                {({
                                    isSubmitting,
                                    resetForm,
                                    touched,
                                    errors,
                                }) => (
                                    <Form autoComplete="off">
                                        {openInput &&
                                        hovered === item.question.id ? (
                                            <>
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
                                                <div className="d-flex justify-content-end ">
                                                    <Button
                                                        className="me-3 mb-0 cancel-btn"
                                                        onClick={() => {
                                                            resetForm;
                                                            setOpenInput(false);
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <FormButton
                                                        type="submit"
                                                        variant="primary"
                                                        name="Update"
                                                        className="submit-btn"
                                                        isSubmitting={
                                                            isSubmitting
                                                        }
                                                        isSubmittingClass={isSubmittingClass(
                                                            isSubmitting
                                                        )}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    try {
        const { data: securityQuestions } = await axiosClient.get(
            "/tasker/cms/security-question/"
        );
        const queryClient = new QueryClient();
        queryClient.prefetchQuery(["security-questions"]);
        const { data: answeredSecurityQuestions } = await axiosClient.get(
            "/tasker/security-answer/"
        );
        queryClient.prefetchQuery(["answered-security-questions"]);
        return {
            props: {
                answeredSecurityQuestions,
                securityQuestions,
                dehydratedState: dehydrate(queryClient),
            },
            revalidate: 10,
        };
    } catch (err: any) {
        return {
            props: {
                answeredSecurityQuestions: [],
                securityQuestions: [],
            },
            revalidate: 10,
        };
    }
};
