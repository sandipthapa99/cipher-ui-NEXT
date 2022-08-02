import { faCircleDot } from "@fortawesome/pro-regular-svg-icons";
import { faCircleDot as circleDot } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import React, { useContext } from "react";
import { AccordionContext, useAccordionButton } from "react-bootstrap";

interface PaymentAccordion {
    children: ReactNode;
    eventKey: string;
    callback: any;
}

function ContextAwareToggle({
    children,
    eventKey,
    callback,
}: PaymentAccordion) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
        <button type="button" onClick={decoratedOnClick}>
            {isCurrentEventKey ? (
                <FontAwesomeIcon
                    icon={circleDot}
                    className="svg-icon-boolen-circle me-3"
                />
            ) : (
                <FontAwesomeIcon
                    icon={faCircleDot}
                    className="svg-icon-simple-circle me-3"
                />
            )}
            {children}
        </button>
    );
}

const Membership = () => {
    return (
        <div className="account-form">
            <h2>Membership</h2>
            <p>Membership Informations</p>
        </div>
    );
};

export default Membership;
