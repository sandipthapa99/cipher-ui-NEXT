import BigButton from "@components/common/Button";
import React from "react";

export const AcceptReject = () => {
    return (
        <div className="accept-reject-component">
            <BigButton
                btnTitle={"Reject"}
                backgroundColor={"#fff"}
                textColor={"black"}
            />
            <BigButton
                btnTitle={"Accept"}
                backgroundColor={"#211D4F"}
                textColor={"#fff"}
            />
        </div>
    );
};
