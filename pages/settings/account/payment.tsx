import PaymentSettings from "@components/settings/PayementSettings";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const Notification = () => {
    return (
        <SettingsLayout title="Payment Settings">
            <PaymentSettings />
        </SettingsLayout>
    );
};

export default Notification;
