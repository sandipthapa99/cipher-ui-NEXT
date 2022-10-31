import ChangePasswordForm from "@components/settings/ChangePasswordForm";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const Security = () => {
    return (
        <SettingsLayout title="Security Settings">
            <ChangePasswordForm />
        </SettingsLayout>
    );
};

export default Security;
