import SocialConnection from "@components/Profile/SocialConnection";
import React from "react";

const ConnectedAccount = () => {
    return (
        <div className="account-form">
            <h2>Connected Account</h2>
            <p>Connected Account</p>
            <div className="d-flex">
                <SocialConnection />
                <SocialConnection />
            </div>
        </div>
    );
};

export default ConnectedAccount;
