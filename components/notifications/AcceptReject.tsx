import BigButton from "@components/common/Button";
import FormButton from "@components/common/FormButton";
import React from "react";

export const AcceptReject = () => {
    return (
        <div className="d-flex accept-reject-component">
            <div className="reject">
                <BigButton
                    btnTitle={"Reject"}
                    backgroundColor={"#fff"}
                    textColor={"black"}
                />
            </div>

            <div className="accept">
                <BigButton
                    btnTitle={"Accept"}
                    backgroundColor={"#211D4F"}
                    textColor={"white"}
                />
            </div>
        </div>
    );
};