import DatePickerField from "@components/common/DateTimeField";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import { PostCard } from "@components/PostTask/PostCard";
import {
    faCalendarDays,
    faSquareCheck,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { EducationValueProps } from "types/educationValueProps";
import { EducationFormData } from "utils/formData";
import { educationFormSchema } from "utils/formValidation/educationFormValidation";
import { isSubmittingClass } from "utils/helpers";

interface EducationProps {
    show?: boolean;
    handleClose?: () => void;
    setShowEducationForm: Dispatch<SetStateAction<boolean>>;
    id?: number;
}
interface EditDetailProps {
    data: { result: EducationValueProps[] };
}

const EducationForm = ({
    show,
    handleClose,
    setShowEducationForm,
    id,
}: EducationProps) => {
    const queryClient = useQueryClient();
    const { mutate } = useForm(`${urls.profile.education}`);
    const { mutate: editMutation } = useEditForm(
        `${urls.profile.education}${id}/`
    );

    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-education",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>Add Education</h3>
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
                                : {
                                      school: "",
                                      description: "",
                                      degree: "",
                                      field_of_study: "",
                                      location: "",
                                      start_date: "",
                                      end_date: "",
                                      id: 0,
                                  }
                            //educationFormData
                        }
                        validationSchema={educationFormSchema}
                        onSubmit={async (values) => {
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
                            {
                                editDetails
                                    ? editMutation(newvalidatedValue, {
                                          onSuccess: async () => {
                                              setShowEducationForm(false);
                                              queryClient.invalidateQueries([
                                                  "tasker-education",
                                              ]);
                                              toast.success(
                                                  "Education detail updated successfully"
                                              );
                                          },
                                          onError: async (error) => {
                                              toast.error(error.message);
                                          },
                                      })
                                    : mutate(newvalidatedValue, {
                                          onSuccess: async () => {
                                              setShowEducationForm(false);
                                              queryClient.invalidateQueries([
                                                  "tasker-education",
                                              ]);
                                              toast.success(
                                                  "Education detail added successfully"
                                              );
                                          },
                                          onError: async (error) => {
                                              toast.error(error.message);
                                          },
                                      });
                            }
                        }}
                    >
                        {({ isSubmitting, errors, setFieldValue, touched }) => (
                            <Form autoComplete="off">
                                <InputField
                                    type="text"
                                    name="school"
                                    labelName="School"
                                    error={errors.school}
                                    touch={touched.school}
                                    placeHolder="Eg: Tribhuvan University"
                                />
                                <InputField
                                    name="description"
                                    labelName="Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Experience Description"
                                    as="textarea"
                                />
                                <InputField
                                    name="degree"
                                    labelName="Degree"
                                    touch={touched.degree}
                                    error={errors.degree}
                                    placeHolder="Eg: Bachelor's"
                                />
                                <InputField
                                    name="field_of_study"
                                    labelName="Field of study"
                                    touch={touched.field_of_study}
                                    error={errors.field_of_study}
                                    placeHolder="Eg: Business"
                                />
                                <InputField
                                    name="location"
                                    labelName="Location"
                                    touch={touched.location}
                                    error={errors.location}
                                    placeHolder="Eg: New Baneshwor, Kathmandu"
                                />
                                <Row className="g-5">
                                    <Col md={6}>
                                        {/* <DatePickerField
                                            name="start_date"
                                            labelName="Start Date"
                                            placeHolder="1999-06-03"
                                            touch={touched.start_date}
                                            error={errors.start_date}
                                            dateFormat="yyyy-MM-dd"
                                        /> */}
                                        <MantineDateField
                                            name="start_date"
                                            labelName="Start Date"
                                            placeHolder="1999-06-03"
                                            touch={Boolean(touched.start_date)}
                                            error={String(errors.start_date)}
                                            //fieldRequired={true}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "start_date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <MantineDateField
                                            name="end_date"
                                            labelName="End Date (Expected)"
                                            placeHolder="2022-03-06"
                                            touch={touched.end_date}
                                            error={errors.end_date}
                                            icon={
                                                <FontAwesomeIcon
                                                    icon={faCalendarDays}
                                                    className="svg-icons"
                                                />
                                            }
                                            handleChange={(value) => {
                                                setFieldValue(
                                                    "end_date",
                                                    format(
                                                        new Date(value),
                                                        "yyyy-MM-dd"
                                                    )
                                                );
                                            }}
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
export default EducationForm;
