import Membership from "@components/settings/Membership";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const MembershipPage = () => {
    return (
        <SettingsLayout title="Membership Settings">
            <Membership />
        </SettingsLayout>
    );
};

export default MembershipPage;
