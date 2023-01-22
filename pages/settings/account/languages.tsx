import LanguagesSettings from "@components/settings/Languages";
import SettingsLayout from "@components/SettingsLayout";
import React from "react";

const Languages = () => {
    return (
        <SettingsLayout title="Language Settings">
            <LanguagesSettings />
        </SettingsLayout>
    );
};

export default Languages;
