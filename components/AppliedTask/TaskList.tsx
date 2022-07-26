import AnchorButton from "@components/common/AnchorButton";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import {
    faCalendar,
    faClockEight,
    faLocationDot,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form,Formik } from "formik";
import Image from "next/image";
import React from "react";
import { TaskList } from "staticData/taskListData";
import { ApplyFormData } from "utils/formData";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { isSubmittingClass } from "utils/helpers";

import picture from "../../public/aboutus/about.png";

const TaskList = ({ task }: { task: TaskList }) => {
    return (
        <div className="task-list">
            <h2>Task List</h2>
            <div className="d-flex flex-column flex-sm-row my-4 py-4 task-list__detial">
                <figure>
                    <Image src={picture} layout="fill"></Image>
                </figure>
                <div className="d-flex flex-column justify-content-around ps-4 task-list__detial--desc">
                    <h4>{task.cardTitle}</h4>
                    <p>
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon-location"
                        />
                        {task.cardlocation}
                    </p>
                    <div className="d-flex justify-content-between">
                        <p>
                            <FontAwesomeIcon
                                icon={faCalendar}
                                className="svg-icon-calender"
                            />
                            {task.cardDate}
                        </p>
                        <p>
                            <FontAwesomeIcon
                                icon={faClockEight}
                                className="svg-icon-clock"
                            />
                            {task.cardTime}
                        </p>
                    </div>
                    <span>{task.cardPrice}</span>
                </div>
            </div>
            <div className="task-list__promo">
                <Formik
                    initialValues={ApplyFormData}
                    validationSchema={applyFormSchema}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="d-flex flex-column flex-sm-row justify-content-between g-5">
                            <span className="w-100 me-5">
                                <InputField
                                    type="number"
                                    name="price"
                                    error={errors.price}
                                    touch={touched.price}
                                    placeHolder="Enter Promo Code"
                                />
                            </span>
                            <FormButton
                                type="submit"
                                variant="primary"
                                name="Apply"
                                className="submit-btn h-25"
                                isSubmitting={isSubmitting}
                                isSubmittingClass={isSubmittingClass(
                                    isSubmitting
                                )}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            <div className="task-list__price">
                <p className="d-flex justify-content-between mb-2">
                    Service Charge <span>Rs 200 </span>
                </p>
                <p className="d-flex justify-content-between mt-1 mb-0">
                    Discount <span> - Rs 200 </span>
                </p>
            </div>
            <div className="d-flex justify-content-between mt-4 task-list__totalprice">
                Total
                <span>{task.cardPrice}</span>
            </div>
            <AnchorButton
                className={"w-100 task-list__button"}
                href={""}
                varient={"secondary"}
            >
                Proceed to Confirm
            </AnchorButton>
        </div>
    );
};

export default TaskList;
