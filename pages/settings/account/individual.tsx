import AccountForm from "@components/settings/AccountForm";
import BankForm from "@components/settings/bankDetail";
import KYCForm from "@components/settings/KYCForm";
import SettingsLayout from "@components/SettingsLayout";
// import React from "react";

const Individual = () => {
    return (
        <SettingsLayout>
            <AccountForm />
            <KYCForm />
            <BankForm />
        </SettingsLayout>
    );
};

export default Individual;
