import EditProfileButton from "@components/Profile/EditProfileButton";
import AddCardForm from "@components/settings/AddCardForm";
import { faCircleDot } from "@fortawesome/pro-regular-svg-icons";
import { faCircleDot as circleDot } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import { useState } from "react";
import React, { useContext } from "react";
import {
    Accordion,
    AccordionContext,
    Card,
    useAccordionButton,
} from "react-bootstrap";
import { creditCardContent } from "staticData/creditCardContent";

import CreditCard from "./CreditCard";

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

const PaymentMethod = () => {
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    return (
        <div className="payment-method mt-5">
            <h2>Payment Methods</h2>
            <div className="payment-method-wraper__cards">
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header className="d-flex flex-column-reverse align-items-center flex-md-row justify-content-between">
                            <ContextAwareToggle eventKey="0" callback={""}>
                                <span className="my-3 my-md-0">
                                    Debit/Credit Card (2)
                                </span>
                            </ContextAwareToggle>
                            <EditProfileButton
                                text="Add New"
                                showModal={true}
                                handleOnClick={() =>
                                    setShowAddCardForm(!showAddCardForm)
                                }
                            />
                            <AddCardForm
                                show={showAddCardForm}
                                setShowAddCardForm={setShowAddCardForm}
                                handleClose={() => setShowAddCardForm(false)}
                            />
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <div className="d-flex flex-column flex-md-row">
                                    {creditCardContent &&
                                        creditCardContent.map((card, key) => (
                                            <CreditCard
                                                key={key}
                                                cardDetail={card}
                                            />
                                        ))}
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <ContextAwareToggle eventKey="1" callback={""}>
                                Digital Wallet (3)
                            </ContextAwareToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Test</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <ContextAwareToggle eventKey="2" callback={""}>
                                Linked Bank (2)
                            </ContextAwareToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>Test</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <ContextAwareToggle eventKey="3" callback={""}>
                                Other Methods (3)
                            </ContextAwareToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>Test</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    );
};

export default PaymentMethod;
