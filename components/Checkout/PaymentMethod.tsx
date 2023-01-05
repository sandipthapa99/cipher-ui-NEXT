import BigButton from "@components/common/Button";
import BankDetailModal from "@components/settings/BankDetailModal";
import {
    Adjust,
    AdjustOutlined,
    ApartmentOutlined,
    Link,
} from "@mui/icons-material";
import { useData } from "hooks/use-data";
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
import type { UserBankDetails } from "types/bankDetail";
import { capitalise } from "utils/capitalise";

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
                <Adjust className="svg-icon-boolen-circle me-3" />
            ) : (
                <AdjustOutlined className="svg-icon-simple-circle me-3" />
            )}
            {children}
        </button>
    );
}

const PaymentMethod = () => {
    // const [showAddCardForm, setShowAddCardForm] = useState(false);

    const { data: BankDetails } = useData<UserBankDetails>(
        ["tasker-bank-account"],
        "/tasker/bank-details/"
    );
    const LinkedBank = BankDetails?.data.result;

    //for bank details modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

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
                                Digital Wallet (3)
                            </ContextAwareToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {/* <div className="d-flex account-wrapper">
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
                                        {bank.is_primary ? (
                                            <div className="primary">
                                                <FontAwesomeIcon
                                                    icon={faBuildingColumns}
                                                    className="svg-icon"
                                                />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="linked-icons">
                                            <FontAwesomeIcon
                                                icon={faLinkSimple}
                                                className="svg-icon"
                                            />
                                            <a href="" className="link">
                                                Linked
                                            </a>
                                        </div>
                                    </div>
                                </div> */}
                            </Card.Body>
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
                                            lg={5}
                                            md={6}
                                            sm={12}
                                            key={bank.id}
                                            className="accounts card-block gx-5"
                                        >
                                            <div className="d-flex account-wrapper">
                                                <div className="account-info">
                                                    <figure className="thumbnail-img">
                                                        <Image
                                                            src={
                                                                bank.bank_name
                                                                    .logo
                                                                    ? bank
                                                                          .bank_name
                                                                          .logo
                                                                    : "/settings/bank.svg"
                                                            }
                                                            layout="fill"
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
                                                    {bank.is_primary ? (
                                                        <div className="primary">
                                                            <ApartmentOutlined className="svg-icon" />
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    <div className="linked-icons">
                                                        <Link className="svg-icon" />
                                                        <a
                                                            href=""
                                                            className="link"
                                                        >
                                                            {bank.is_verified
                                                                ? "Linked"
                                                                : "Pending"}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                                {/* <Link
                                    href="/settings/account/individual"
                                    className="text-profile"
                                >
                                    <a href=""> */}
                                <BigButton
                                    btnTitle={"Link Bank"}
                                    backgroundColor={"#211D4F"}
                                    textColor="#fff"
                                    handleClick={() => setShow(true)}
                                />
                                {/* </a>
                                </Link> */}

                                {/* Bank Account details */}
                            </Card.Body>
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
            <BankDetailModal
                show={show}
                handleClose={handleClose}
                setShowForm={setShow}
            />
        </div>
    );
};
export default PaymentMethod;
