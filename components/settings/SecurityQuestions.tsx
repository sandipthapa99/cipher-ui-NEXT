import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { faPencil, faTrashCan } from "@fortawesome/pro-regular-svg-icons";
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
import { Button, Modal } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

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
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteID] = useState<any>(0);
    const { mutate: editAnswer } = useEditForm(
        `/tasker/security-answer/${questionId}/`
    );
    const deleteMutation = useMutation((id) => {
        return axiosClient.delete(`/tasker/security-answer/${id}`);
    });

    const handleDeleteQuestion = () => {
        deleteMutation.mutate(deleteId, {
            onSuccess: () => {
                toast.success("Answer deleted Successfully");
                queryClient.invalidateQueries(["answered-security-questions"]);
                setShowDelete(false);
            },
            onError: (error: any) => {
                toast.error(error?.response.message);
            },
        });
    };

    return (
        <>
            {" "}
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
                                <li
                                    key={index}
                                    className="d-flex align-items-center m-4 justify-content-between"
                                >
                                    {`${index + 1}.${" "} ${
                                        item?.question?.question
                                    }`}
                                    <div>
                                        <FontAwesomeIcon
                                            className="svg-icon"
                                            icon={faPencil}
                                            color="#002366"
                                            onClick={() => {
                                                setOpenInput(!openInput);
                                                setQuestionId(item.question.id);
                                                setHovered(item.question.id);
                                            }}
                                        />
                                        <FontAwesomeIcon
                                            className="svg-icon"
                                            color="red"
                                            icon={faTrashCan}
                                            onClick={() => {
                                                setShowDelete(true);
                                                setDeleteID(item?.question?.id);
                                            }}
                                        />
                                    </div>
                                </li>
                                <Formik
                                    initialValues={{
                                        answer: item?.answer,
                                    }}
                                    onSubmit={async (values) => {
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
                                        <Form
                                            autoComplete="off"
                                            className="m-3"
                                        >
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
                                                                setOpenInput(
                                                                    false
                                                                );
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
            <div className="share-modal delete-modal">
                {/* Modal component */}
                <Modal
                    centered
                    show={showDelete}
                    onHide={() => setShowDelete(false)}
                    backdrop="static"
                    size="sm"
                >
                    <Modal.Header closeButton> </Modal.Header>
                    <div className="applied-modal share-modal__modal-body-content">
                        <h3>Are you sure you want to delete your Question?</h3>

                        <Modal.Footer>
                            <Button
                                className="btn close-btn"
                                variant="secondary"
                            >
                                No
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => handleDeleteQuestion()}
                            >
                                Yes
                            </Button>
                        </Modal.Footer>
                    </div>
                </Modal>
            </div>
        </>
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
