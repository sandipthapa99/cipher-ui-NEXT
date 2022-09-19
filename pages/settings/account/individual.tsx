import AccountForm from "@components/settings/AccountForm";
import AddBank from "@components/settings/bankDetail";
import KYCForm from "@components/settings/KYCForm";
import SettingsLayout from "@components/SettingsLayout";
// import React from "react";

const Individual = () => {
    return (
        <SettingsLayout>
            <AccountForm />
            <KYCForm />
            <AddBank />
        </SettingsLayout>
    );
};

export default Individual;
