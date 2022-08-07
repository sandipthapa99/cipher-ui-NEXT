import AccountForm from "@components/settings/AccountForm";
import KYCForm from "@components/settings/KYCForm";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const Individual = () => {
    return (
        <SettingsLayout>
            <AccountForm />
            <KYCForm />
        </SettingsLayout>
    );
};

export default Individual;