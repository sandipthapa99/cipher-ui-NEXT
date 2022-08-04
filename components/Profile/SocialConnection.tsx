import BigButton from "@components/common/Button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import type { socialConnectionProps } from "staticData/socialConnection";

const SocialConnection = ({ values }: { values: socialConnectionProps }) => {
    return (
        <div className="social-connection me-4">
            <span className="d-flex align-items-center justify-content-center my-4">
                <FontAwesomeIcon icon={faGoogle} className="pe-3" />
                <h4>{values.provider}</h4>
            </span>
            <p>Your are signed in as {values.email}</p>
            <span className="d-flex align-items-center justify-content-center my-4">
                {values.isConnected ? (
                    <BigButton btnTitle="Connect" backgroundColor={"#211d4f"} />
                ) : (
                    <Button className="btn close-btn px-3">Disconnect</Button>
                )}
            </span>
        </div>
    );
};

export default SocialConnection;
