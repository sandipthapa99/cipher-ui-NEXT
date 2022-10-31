import DeactivateAccount from "@components/settings/Deactivate";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const Deactivate = () => {
    return (
        <SettingsLayout title="Account Deactivation">
            <DeactivateAccount />
        </SettingsLayout>
    );
};

export default Deactivate;
