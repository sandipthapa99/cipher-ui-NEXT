import BigButton from "@components/common/Button";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faTrashCan } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "hooks/use-data";
import React from "react";

interface AccountInfo {
    name: string;
}

const ConnectAccount = ({ name }: AccountInfo) => {
    return (
        <div className="account-wrapper">
            <div className="social-connection  me-4">
                {/* <span className="d-flex flex-col align-items-center justify-content-center my-4"> */}
                <div className="d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                        icon={name === "Google" ? faGoogle : faFacebookF}
                        className="svg-icon facebook-icon"
                    />
                </div>

                <h4 className="text-center">{name}</h4>
                {/* </span> */}
                <p>You are not signed in through {name}.</p>
                <div className="d-flex button-wrapper align-items-stretch justify-content-center my-4">
                    <BigButton
                        btnTitle={"Connect"}
                        backgroundColor={"#211d4f"}
                        textColor={"#fff"}
                        //  handleClick={handleCloseModal}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConnectAccount;
