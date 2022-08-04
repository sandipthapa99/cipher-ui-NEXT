import AnchorButton from "@components/common/AnchorButton";
import FormButton from "@components/common/FormButton";
import InputField from "@components/common/InputField";
import {
    faCalendar,
    faClockEight,
    faLocationDot,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useBookContext } from "context/BookNowContext/bookNowContext";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { TaskList } from "staticData/taskListData";
import { ApplyFormData } from "utils/formData";
import { applyFormSchema } from "utils/formValidation/applyFormValidation";
import { isSubmittingClass } from "utils/helpers";

import picture from "../../public/aboutus/about.png";
import { CheckoutModal } from "../Checkout/checkoutModal";

const TaskList = ({ task }: { task: TaskList }) => {
    const { bookNowDetails } = useBookContext();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="task-list">
                <h2>Task List</h2>
                <div className="d-flex flex-column flex-sm-row my-4 py-4 task-list__detial">
                    <figure>
                        <Image
                            src={
                                bookNowDetails
                                    ? bookNowDetails.image
                                    : "/services/s1.png"
                            }
                            alt="task-img"
                            layout="fill"
                        ></Image>
                    </figure>
                    <div className="d-flex flex-column justify-content-around ps-4 task-list__detial--desc">
                        <h4>{bookNowDetails.serviceTitle}</h4>
                        <p>
                            <FontAwesomeIcon
                                icon={faLocationDot}
                                className="svg-icon svg-icon-location"
                            />
                            {bookNowDetails.serviceProviderLocation}
                        </p>
                        <div className="d-flex justify-content-between">
                            <p>
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="svg-icon svg-icon-calender"
                                />
                                {task.cardDate}
                            </p>
                            <p>
                                <FontAwesomeIcon
                                    icon={faClockEight}
                                    className="svg-icon svg-icon-clock"
                                />
                                {task.cardTime}
                            </p>
                        </div>
                        <span>{bookNowDetails.servicePrice}</span>
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
                                        type="string"
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
                    <span>{bookNowDetails.servicePrice}</span>
                </div>
                <AnchorButton
                    className={"w-100 task-list__button"}
                    href={""}
                    varient={"secondary"}
                    onClick={handleShow}
                >
                    Proceed to Confirm
                </AnchorButton>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CheckoutModal show={show} onHide={handleClose} />
                </div>
            </div>
        </>
    );
};

export default TaskList;
