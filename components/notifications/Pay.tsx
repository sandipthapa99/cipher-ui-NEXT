import BigButton from "@components/common/Button";
import React from "react";

export const Pay = () => {
    return (
        <div className="d-flex pay-component">
            <p>$10</p>
            <BigButton btnTitle={"Pay"} backgroundColor={"#211D4F"} />
        </div>
    );
};
