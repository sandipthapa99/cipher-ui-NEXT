import SwitchValue from "@components/common/SwitchValue";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HelpSettings = () => {
    return (
        <div className="account-form">
            <h2>Help & Legal</h2>
            <p>Get support and more info</p>
            <div className="d-flex justify-content-between align-items-center security-toggle help-wrapper">
                <span>
                    <h2>Lorem Ipsum is simply dummy</h2>
                    <p>
                        Enter a code generated by your authenticator app to
                        confirm it’s you.
                    </p>
                </span>
                <SwitchValue />
            </div>
            <div className="d-flex justify-content-between align-items-center security-toggle help-wrapper">
                <span>
                    <h2>Lorem Ipsum is simply dummy</h2>
                    <p>
                        Enter a code generated by your authenticator app to
                        confirm it’s you.
                    </p>
                </span>
                <SwitchValue />
            </div>
            <div className="d-flex justify-content-between align-items-center security-toggle help-wrapper">
                <span>
                    <h2>Lorem Ipsum is simply dummy</h2>
                    <p>
                        Enter a code generated by your authenticator app to
                        confirm it’s you.
                    </p>
                </span>
                <SwitchValue />
            </div>
            <div className="d-flex justify-content-between security-toggle">
                <h2>Security Question</h2>
                <FontAwesomeIcon icon={faPencil} className="svg-icon" />
            </div>
            <p className="mb-3 d-flex align-content-center">
                <input
                    type="checkbox"
                    name="toggle"
                    className="checkbox me-3"
                />{" "}
                Enabled
            </p>
            <p>Answer a question you choose to confirm it’s you.</p>
        </div>
    );
};

export default HelpSettings;