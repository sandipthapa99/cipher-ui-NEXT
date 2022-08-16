import BigButton from "@components/common/Button";
import {
    faChevronDown,
    faChevronRight,
} from "@fortawesome/pro-regular-svg-icons";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import React, { useContext } from "react";
import {
    Accordion,
    AccordionContext,
    Card,
    useAccordionButton,
} from "react-bootstrap";
import { membershipPlanData } from "staticData/membershipPlanData";

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
        <button
            type="button"
            className="border-0 bg-transparent text-info"
            onClick={decoratedOnClick}
        >
            {children}
            {isCurrentEventKey ? (
                <span className="my-3 my-md-0">
                    Show Plan <FontAwesomeIcon icon={faChevronDown} />
                </span>
            ) : (
                <span className="my-3 my-md-0">
                    Show Plan <FontAwesomeIcon icon={faChevronRight} />
                </span>
            )}
        </button>
    );
}

const Membership = () => {
    return (
        <div className="account-form">
            <h2>Membership</h2>
            <p>Membership Informations</p>
            <Accordion defaultActiveKey="2" className="membership">
                <Card className="border-0">
                    <Card.Header
                        className={
                            "d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between bg-transparent py-4 px-0"
                        }
                    >
                        <p className="m-0">
                            FREE <br></br>
                            <span>Cipher Free Plan</span>
                        </p>
                        <ContextAwareToggle eventKey="0" callback={""}>
                            {""}
                        </ContextAwareToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <ul>
                                {membershipPlanData[0].free.map(
                                    (value, key) => (
                                        <li key={key}>
                                            <span className="bg-info w-25 rounded me-4">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="px-1 text-white"
                                                />
                                            </span>
                                            {value}
                                        </li>
                                    )
                                )}
                            </ul>
                            <BigButton
                                backgroundColor={"#211D4F"}
                                btnTitle={"Select Plan"}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="border-0">
                    <Card.Header className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between bg-transparent py-4 px-0">
                        <p className="m-0">
                            BASIC <br></br>
                            <span>Cipher Basic Plan</span>
                        </p>
                        <ContextAwareToggle eventKey="1" callback={""}>
                            {""}
                        </ContextAwareToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <ul>
                                {membershipPlanData[0].basic.map(
                                    (value, key) => (
                                        <li key={key}>
                                            <span className="bg-info w-25 rounded me-4">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="px-1 text-white"
                                                />
                                            </span>
                                            {value}
                                        </li>
                                    )
                                )}
                            </ul>
                            <BigButton
                                backgroundColor={"#211D4F"}
                                btnTitle={"Select Plan"}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="border-0">
                    <Card.Header className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between bg-transparent py-4 px-0">
                        <p className="m-0">
                            SILVER <br></br>
                            <span>Cipher Silver Plan</span>
                        </p>
                        <ContextAwareToggle eventKey="2" callback={""}>
                            {""}
                        </ContextAwareToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <ul>
                                {membershipPlanData[0].silver.map(
                                    (value, key) => (
                                        <li key={key}>
                                            <span className="bg-info w-25 rounded me-4">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="px-1 text-white"
                                                />
                                            </span>
                                            {value}
                                        </li>
                                    )
                                )}
                            </ul>
                            <BigButton
                                backgroundColor={"#211D4F"}
                                btnTitle={"Select Plan"}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="border-0">
                    <Card.Header className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between bg-transparent py-4 px-0">
                        <p className="m-0">
                            PREMIUM <br></br>
                            <span>Cipher Premium Plan</span>
                        </p>
                        <ContextAwareToggle eventKey="3" callback={""}>
                            {""}
                        </ContextAwareToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <ul>
                                {membershipPlanData[0].premium.map(
                                    (value, key) => (
                                        <li key={key}>
                                            <span className="bg-info w-25 rounded me-4">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="px-1 text-white"
                                                />
                                            </span>
                                            {value}
                                        </li>
                                    )
                                )}
                            </ul>
                            <BigButton
                                backgroundColor={"#211D4F"}
                                btnTitle={"Select Plan"}
                            />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default Membership;
