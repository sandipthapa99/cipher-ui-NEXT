import NotificationSettings from "@components/settings/NotificationSettings";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const Notification = () => {
    return (
        <SettingsLayout title="Notifications Settings">
            <NotificationSettings />
        </SettingsLayout>
    );
};

export default Notification;
