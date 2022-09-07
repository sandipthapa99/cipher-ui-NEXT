import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import SelectInputField from "@components/common/SelectInputField";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { ExperienceValueProps } from "types/experienceValueProps";
import { ExperienceFormData } from "utils/formData";
import { experienceFormSchema } from "utils/formValidation/experienceFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface ExperienceProps {
    show?: boolean;
    handleClose?: () => void;
    setShowExpForm: Dispatch<SetStateAction<boolean>>;
    id?: number;
}

interface EditDetailProps {
    data: { result: ExperienceValueProps[] };
}

const dropdownOptions = [{ id: 1, label: "Part Time", value: "Part Time" }];

const ExperienceForm = ({
    show,
    handleClose,
    setShowExpForm,
    id,
}: ExperienceProps) => {
    const { mutate } = useForm(`/tasker/experience/`);
    const { mutate: editMutation } = useEditForm(`/tasker/experience/${id}/`);

    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-experience",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);
    const [toggle, setToggled] = useState(
        editDetails?.currently_working ?? false
    );

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Add Experience</h3>
                    <Formik
                        initialValues={
                            editDetails
                                ? {
                                      ...editDetails,
                                      start_date: parseISO(
                                          editDetails.start_date
                                      ),

                                      end_date: editDetails.end_date
                                          ? parseISO(editDetails.end_date)
                                          : "",
                                  }
                                : ExperienceFormData
                        }
                        validationSchema={experienceFormSchema}
                        onSubmit={async (values) => {
                            let newValue;
                            if (!values.end_date) {
                                const withoutEndDate = {
                                    ...values,
                                    start_date: format(
                                        new Date(values.start_date),
                                        "yyyy-MM-dd"
                                    ),
                                    end_date: null,
                                };
                                newValue = withoutEndDate;
                            } else {
                                const newvalidatedValue = {
                                    ...values,
                                    start_date: format(
                                        new Date(values.start_date),
                                        "yyyy-MM-dd"
                                    ),

                                    end_date: format(
                                        new Date(values.end_date),
                                        "yyyy-MM-dd"
                                    ),
                                };
                                newValue = newvalidatedValue;
                            }
                            {
                                editDetails
                                    ? editMutation(newValue, {
                                          onSuccess: async () => {
                                              console.log(
                                                  "submitted values",
                                                  values
                                              );
                                              setShowExpForm(false);
                                              queryClient.invalidateQueries([
                                                  "tasker-experience",
                                              ]);
                                              toast.success(
                                                  "Experience detail updated successfully"
                                              );
                                          },
                                          onError: async (error) => {
                                              toast.error(error.message);
                                              console.log("error=", error);
                                          },
                                      })
                                    : mutate(newValue, {
                                          onSuccess: async () => {
                                              console.log(
                                                  "submitted values",
                                                  values
                                              );
                                              setShowExpForm(false);
                                              queryClient.invalidateQueries([
                                                  "tasker-experience",
                                              ]);
                                              toast.success(
                                                  "Experience detail added successfully"
                                              );
                                          },
                                          onError: async (error) => {
                                              toast.error(error.message);
                                              console.log("error=", error);
                                          },
                                      });
                            }
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <InputField
                                    type="text"
                                    name="title"
                                    labelName="Title"
                                    error={errors.title}
                                    touch={touched.title}
                                    placeHolder="Experience Title"
                                />
                                <InputField
                                    name="description"
                                    labelName="Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Experience Description"
                                    as="textarea"
                                />
                                <SelectInputField
                                    name="employment_type"
                                    labelName="Employment"
                                    touch={touched.employment_type}
                                    error={errors.employment_type}
                                    placeHolder="Full Time"
                                    options={dropdownOptions}
                                />
                                <InputField
                                    name="company_name"
                                    labelName="Company Name"
                                    touch={touched.company_name}
                                    error={errors.company_name}
                                    placeHolder="Company Name"
                                />
                                <InputField
                                    name="location"
                                    labelName="Location"
                                    touch={touched.location}
                                    error={errors.location}
                                    placeHolder="Eg: New Baneshwor, Kathmandu"
                                />
                                <p className="mb-3">
                                    <input
                                        type="checkbox"
                                        name="currently_working"
                                        checked={toggle ? true : false}
                                        onChange={() => setToggled(!toggle)}
                                    />
                                    &nbsp;I am currently working here
                                </p>

                                <Row className="g-5">
                                    <Col md={6}>
                                        <DatePickerField
                                            name="start_date"
                                            labelName="Start Date"
                                            placeHolder="1999-06-03"
                                            touch={touched.start_date}
                                            error={errors.start_date}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <DatePickerField
                                            name="end_date"
                                            labelName="End Date"
                                            placeHolder="2022-03-06"
                                            touch={touched.end_date}
                                            error={errors.end_date}
                                            dateFormat="yyyy-MM-dd"
                                            disabled={toggle ? true : false}
                                        />
                                    </Col>
                                </Row>
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
                                        name="Apply"
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
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </>
    );
};
export default ExperienceForm;
