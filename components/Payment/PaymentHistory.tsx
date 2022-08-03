import SelectInputField from "@components/common/SelectInputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterList } from "@fortawesome/pro-regular-svg-icons";
import React from "react";
import { Container } from "react-bootstrap";
import { PaymentHistoryTable } from "./PaymentHistoryTable";

export const PaymentHistory = () => {
    return (
        <>
            <section
                id="payment-history-header-section"
                className="payment-history-header-section"
            >
                <Container>
                    <div className="d-flex justify-content-between align-items-center payment-history-header">
                        <h1>Payment History</h1>

                        <div className="d-flex filter">
                            <select id="cars" name="cars">
                                <option value="volvo">pending</option>
                                <option value="saab">cancelled</option>
                                <option value="fiat">fulfilled</option>
                                <option value="audi">All</option>
                            </select>

                            <span className="filter-icon">
                                <FontAwesomeIcon icon={faFilterList} />
                            </span>
                        </div>
                    </div>
                </Container>
            </section>
            <section
                id="payment-history-table-section"
                className="payment-history-table-section"
            >
                <Container>
                    <PaymentHistoryTable />
                </Container>
            </section>
        </>
    );
};
