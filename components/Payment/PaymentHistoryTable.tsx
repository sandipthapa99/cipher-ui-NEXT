import React from "react";
import { Dropdown } from "react-bootstrap";

export const PaymentHistoryTable = () => {
    return (
        <div className="payment-history-table">
            <h4>Payment History</h4>
            <div className="table-responsive">
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    id="thead"
                                    name="thead"
                                    value="checked"
                                />
                            </th>
                            <th>Order</th>
                            <th>Name</th>
                            <th>SERVICE</th>
                            <th>PAYMENT RECEIVED</th>
                            <th>STATUS</th>
                            <th>TOTAL</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="checkbox"
                                    id="thead"
                                    name="thead"
                                    value="checked"
                                />
                            </td>
                            <td>#123</td>
                            <td>Morvious</td>
                            <td>Gardern Cleaning</td>
                            <td>03 Aug 2022</td>
                            <td>pending</td>
                            <td>$12542</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle>ACTIONS</Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">
                                            Action
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">
                                            Another action
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">
                                            Something else
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
