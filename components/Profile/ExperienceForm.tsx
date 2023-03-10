import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import MantineDateField from "@components/common/MantineDateField";
import SelectInputField from "@components/common/SelectInputField";
import { PlacesAutocomplete } from "@components/PlacesAutocomplete";
import { PostCard } from "@components/PostTask/PostCard";
import { RichText } from "@components/RichText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Textarea } from "@mantine/core";
import { CalendarTodayOutlined } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import urls from "constants/urls";
import { format, parseISO } from "date-fns";
import { Form, Formik } from "formik";
import { useEditForm } from "hooks/use-edit-form";
import { useForm } from "hooks/use-form";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type { ExperienceValueProps } from "types/experienceValueProps";
import { experienceFormSchema } from "utils/formValidation/experienceFormValidation";
import { isSubmittingClass } from "utils/helpers";
import { toast } from "utils/toast";

interface ExperienceProps {
    show?: boolean;
    handleClose?: () => void;
    setShowExpForm: Dispatch<SetStateAction<boolean>>;
    id?: number;
    isEditExperience?: boolean;
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
    isEditExperience,
}: ExperienceProps) => {
    const { mutate } = useForm(`${urls.profile.experience}`);
    const { mutate: editMutation } = useEditForm(
        `${urls.profile.experience}${id}/`
    );

    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<EditDetailProps>([
        "tasker-experience",
    ]);

    const editDetails = data?.data?.result.find((item) => item.id === id);

    const [toggle, setToggled] = useState(
        editDetails?.currently_working ? editDetails?.currently_working : false
    );

    return (
        <>
            {/* Modal component */}
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal  add-portfolio">
                    <h3>Add Experience</h3>
                    <Formik
                        initialValues={
                            editDetails && isEditExperience === true
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
                                      title: "",
                                      description: "",
                                      employment_type: "Full Time",
                                      company_name: "",
                                      location: "",
                                      start_date: "",
                                      end_date: "",
                                      currently_working: false,
                                      id: 0,
                                  }
                            //ExperienceFormData
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
                                editDetails && isEditExperience
                                    ? editMutation(newValue, {
                                          onSuccess: async () => {
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
                                          },
                                      })
                                    : mutate(newValue, {
                                          onSuccess: async () => {
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
                                          },
                                      });
                            }
                        }}
                    >
                        {({
                            isSubmitting,
                            errors,
                            touched,
                            setFieldValue,
                            getFieldProps,
                            values,
                        }) => (
                            <Form>
                                <InputField
                                    type="text"
                                    name="title"
                                    labelName="Title"
                                    error={errors.title}
                                    touch={touched.title}
                                    placeHolder="Experience Title"
                                    fieldRequired
                                />
                                <InputField
                                    name="description"
                                    labelName="Description"
                                    touch={touched.description}
                                    error={errors.description}
                                    placeHolder="Experience Description"
                                    as="textarea"
                                    fieldRequired
                                />
                                {/* <RichText
                                    {...getFieldProps("description")}
                                    value={values?.description ?? ""}
                                    onChange={(value) =>
                                        setFieldValue("description", value)
                                    }
                                    placeholder="Your Experience"
                                /> */}
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
                                    fieldRequired
                                />
                                {/* <InputField
                                    name="location"
                                    labelName="Location"
                                    touch={touched.location}
                                    error={errors.location}
                                    placeHolder="Eg: New Baneshwor, Kathmandu"
                                /> */}
                                <PlacesAutocomplete
                                    size="md"
                                    label="Location"
                                    placeholder="Eg: New Baneshwor, Kathmandu"
                                    error={
                                        touched.location && errors.location
                                            ? errors.location
                                            : undefined
                                    }
                                    {...getFieldProps("location")}
                                    value={values.location}
                                    onPlaceChange={(value) =>
                                        setFieldValue("location", value)
                                    }
                                    withAsterisk
                                />
                                <p className="mb-3">
                                    {/* <Checkbox
                                        label="I am currently working here"
                                        name="currently_working"
                                        defaultChecked={toggle ? true : false}
                                        onChange={(event) => {
                                            setToggled(!toggle);
                                            setFieldValue(
                                                "currently_working",
                                                toggle
                                            );
                                        }}
                                    /> */}
                                    <br />
                                    <Checkbox
                                        defaultChecked={toggle}
                                        label="I am currently working here"
                                        {...getFieldProps("currently_working")}
                                        onChange={(event) => {
                                            setToggled(!toggle);

                                            setFieldValue(
                                                "currently_working",
                                                event.target.checked
                                            );
                                        }}
                                    />
                                    {/* <input
                                        type="checkbox"
                                        name="currently_working"
                                        checked={toggle ? true : false}
                                        onChange={() => setToggled(!toggle)}
                                    /> */}
                                </p>

                                <MantineDateField
                                    name="start_date"
                                    labelName="Start Date"
                                    placeHolder="1999-06-03"
                                    touch={Boolean(touched.start_date)}
                                    error={String(
                                        errors.start_date
                                            ? errors.start_date
                                            : ""
                                    )}
                                    fieldRequired={true}
                                    icon={
                                        <CalendarTodayOutlined className="svg-icons" />
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

                                {/* <DatePickerField
                                            name="end_date"
                                            labelName="End Date"
                                            placeHolder="2022-03-06"
                                            touch={touched.end_date}
                                            error={errors.end_date}
                                            dateFormat="yyyy-MM-dd"
                                            disabled={toggle ? true : false}
                                        /> */}

                                <MantineDateField
                                    name="end_date"
                                    labelName="End Date"
                                    placeHolder="2022-03-06"
                                    touch={touched.end_date}
                                    error={errors.end_date}
                                    disabled={toggle ? true : false}
                                    icon={
                                        <CalendarTodayOutlined className="svg-icons" />
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
            />
        </>
    );
};

export default ExperienceForm;
