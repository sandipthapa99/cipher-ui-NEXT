import EditProfileButton from "@components/Profile/EditProfileButton";
import AddCardForm from "@components/settings/AddCardForm";
import { faCircleDot } from "@fortawesome/pro-regular-svg-icons";
import {
    faCircleDot as circleDot,
    faLink,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import type { GetStaticProps } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import React, { useContext } from "react";
import {
    Accordion,
    AccordionContext,
    Card,
    Col,
    Row,
    useAccordionButton,
} from "react-bootstrap";
import { creditCardContent } from "staticData/creditCardContent";
import type { UserBankDetails } from "types/bankDetail";
import { axiosClient } from "utils/axiosClient";

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

    const { data: BankDetails } = useData<UserBankDetails>(
        ["tasker-bank-account"],
        "/tasker/bank-details/"
    );
    console.log("bank details", BankDetails);
    const LinkedBank = BankDetails?.data.result;

    //capitalise words

    const capitalise = (str: string) => {
        const arr = str.split(" ");

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const result = arr.join(" ");
        console.log("result=", result);
        return result;
    };

    return (
        <div className="payment-method mt-5">
            <h2>Payment Methods</h2>
            <div className="payment-method-wraper__cards">
                <Accordion defaultActiveKey="0">
                    {/* <Card>
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
                    </Card> */}
                    <Card>
                        <Card.Header>
                            <ContextAwareToggle eventKey="1" callback={""}>
                                Digital Wallet (5)
                            </ContextAwareToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>Test</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <ContextAwareToggle eventKey="2" callback={""}>
                                Linked Bank ({LinkedBank?.length})
                            </ContextAwareToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body className="linked-account">
                                <Row className="gx-5">
                                    {LinkedBank?.map((bank) => (
                                        <Col
                                            lg={4}
                                            md={6}
                                            sm={12}
                                            key={bank.id}
                                            className="accounts card-block gx-5 mx-"
                                        >
                                            <div className="d-flex account-wrapper">
                                                <div className="account-info">
                                                    <figure className="thumbnail-img">
                                                        <Image
                                                            src="/settings/digital-wallet/khalti.svg"
                                                            layout="fill"
                                                            // height={45}
                                                            // width={45}
                                                            objectFit="contain"
                                                            alt="bank-icon"
                                                        />
                                                    </figure>
                                                    <p>
                                                        {capitalise(
                                                            `${bank.bank_name.name.toLowerCase()}`
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="linked">
                                                    <FontAwesomeIcon
                                                        icon={faLink}
                                                        className="svg-icon"
                                                    />
                                                    <a href="" className="link">
                                                        Linked
                                                    </a>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                {/* Bank Account details */}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <ContextAwareToggle eventKey="3" callback={""}>
                                International Payments (1)
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

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();
    try {
        const { data: linkedBankAccount } = await axiosClient.get(
            "/tasker/bank-details/"
        );

        await Promise.all([queryClient.prefetchQuery(["tasker-bank-account"])]);
        return {
            props: {
                linkedBankAccount,
                dehydratedState: dehydrate(queryClient),
            },
        };
    } catch (err) {
        return {
            props: {
                linkedBankAccount: [],
            },
            revalidate: 10,
        };
    }
};
