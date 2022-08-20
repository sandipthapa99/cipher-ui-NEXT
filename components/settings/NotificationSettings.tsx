import SelectInputField from "@components/common/SelectInputField";
import { Form } from "formik";
import { Formik } from "formik";
import React from "react";
import { AccountFromData } from "utils/formData";

const notificationOptions = [
    { id: 1, label: "Your task Activities", value: "taskActivities" },
    { id: 2, label: "New taks/ services", value: "newTask" },
];

const NotificationSettings = () => {
    return (
        <div className="account-form">
            <h2>Messages</h2>
            <p>Your Message Notification Settings</p>
            <Formik
                initialValues={AccountFromData}
                onSubmit={async (values, action) => {
                    console.log(values);
                    action.resetForm();
                }}
            >
                <Form autoComplete="off">
                    <SelectInputField
                        name="notification"
                        labelName="Show Notification for:"
                        placeHolder="All activity"
                        options={notificationOptions}
                    />
                    {/* <SelectInputField
                        name="message"
                        labelName="Important Message Counter for"
                        placeHolder="Important activity Only"
                        options={notificationOptions}
                    /> */}
                    <hr />
                    <h2>Email</h2>
                    <p>Your Email Notification Setting</p>
                    <SelectInputField
                        name="activity"
                        labelName="Send an Email with unread activity for"
                        placeHolder="All activity"
                        options={notificationOptions}
                    />
                    {/* <SelectInputField
                        name="country"
                        labelName="Receive Emails for Service Backend"
                        placeHolder="select"
                        options={serviceBackendOptions}
                    /> */}
                </Form>
            </Formik>
        </div>
    );
};

export default NotificationSettings;
