import BigButton from "@components/common/Button";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialConnection = () => {
    return (
        <div className="social-connection me-4">
            <span className="d-flex align-items-center justify-content-center my-4">
                <FontAwesomeIcon icon={faGoogle} className="pe-3" />
                <h4>Google</h4>
            </span>
            <p>Your are signed in as harrysmith@gmail.com</p>
            <span className="d-flex align-items-center justify-content-center my-4">
                <BigButton btnTitle="Connect" backgroundColor={"#211d4f"} />
            </span>
        </div>
    );
};

export default SocialConnection;
