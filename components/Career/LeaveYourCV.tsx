import BigButton from "@components/common/Button";
import React from "react";

const LeaveYourCV = () => {
    return (
        <div className="d-flex justify-content-between align-items-md-center flex-column flex-md-row banner-wrapper">
            <div className="banner-wrapper__detail">
                <h2>Nothing for you?</h2>
                <p>Let us know that you’re interested.</p>
            </div>
            <BigButton
                btnTitle={"Leave your CV"}
                backgroundColor={"$secondary-color"}
            />
        </div>
    );
};

export default LeaveYourCV;
