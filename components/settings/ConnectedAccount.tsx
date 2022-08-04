import SocialConnection from "@components/Profile/SocialConnection";
import React from "react";
import { socialConnectionValues } from "staticData/socialConnection";

const ConnectedAccount = () => {
    return (
        <div className="account-form">
            <h2>Connected Account</h2>
            <p>Connected Account</p>
            <div className="d-flex">
                {socialConnectionValues.map((values, key) => (
                    <SocialConnection key={key} values={values} />
                ))}
            </div>
        </div>
    );
};

export default ConnectedAccount;
