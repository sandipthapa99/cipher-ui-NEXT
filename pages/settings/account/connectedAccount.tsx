import ConnectedAccount from "@components/settings/ConnectedAccount";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const connectedAccount = () => {
    return (
        <SettingsLayout title="Connected Accounts">
            <ConnectedAccount />
        </SettingsLayout>
    );
};

export default connectedAccount;
