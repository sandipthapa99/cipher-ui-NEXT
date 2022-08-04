import SelectInputField from "@components/common/SelectInputField";
import { Form } from "formik";
import { Formik } from "formik";
import React from "react";
import { AccountFromData } from "utils/formData";

const dropdownCountryOptions = [
    { id: 1, label: "All activity", value: "All activity" },
    { id: 2, label: "USA", value: "usa" },
    { id: 3, label: "Canda", value: "canda" },
];
const dropdownCurrencyOptions = [
    {
        id: 1,
        label: "Important activity Only",
        value: "Important activity Only",
    },
    { id: 2, label: "Dollar", value: "dollar" },
    { id: 3, label: "CDollar", value: "cdollar" },
];
const serviceBackendOptions = [
    {
        id: 1,
        label: "Yes",
        value: "yes",
    },
    { id: 2, label: "No", value: "no" },
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
                        options={dropdownCountryOptions}
                    />
                    <SelectInputField
                        name="message"
                        labelName="Important Message Counter for"
                        placeHolder="Important activity Only"
                        options={dropdownCurrencyOptions}
                    />
                    <hr />
                    <h2>Email</h2>
                    <p>Your Email Notification Setting</p>
                    <SelectInputField
                        name="activity"
                        labelName="Send an Email with unread activity for"
                        placeHolder="All activity"
                        options={dropdownCurrencyOptions}
                    />
                    <SelectInputField
                        name="country"
                        labelName="Receive Emails for Service Backend"
                        placeHolder="select"
                        options={serviceBackendOptions}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default NotificationSettings;
