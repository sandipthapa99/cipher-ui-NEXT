import AnchorButton from "@components/common/AnchorButton";
import { faCheck, faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface BillingLocationProps {
    location: string;
}

const BillingLocation = ({ location }: BillingLocationProps) => {
    return (
        <div className="billing-location">
            <h2>Billing Location</h2>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center billing-location__location">
                <span>
                    <FontAwesomeIcon
                        icon={faLocationDot}
                        className="svg-icon-location"
                    />
                    {location}
                </span>
                <AnchorButton className={"px-5"} href={""} varient={""}>
                    Change
                </AnchorButton>
            </div>
            <span>
                <FontAwesomeIcon
                    icon={faCheck}
                    className="me-3 svg-icon-check"
                />
                Same as Task Location
            </span>
        </div>
    );
};

export default BillingLocation;
