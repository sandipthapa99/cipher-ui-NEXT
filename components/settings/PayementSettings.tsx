import PaymentMethod from "@components/Checkout/PaymentMethod";
import React from "react";

const PaymentSettings = () => {
    return (
        <div className="account-form">
            <h2>Billing Methods</h2>
            <p>Your Billings Configurations</p>
            <h2>You have not set up any billing methods yet</h2>
            <p>
                Your billing method will be charged only when your available
                balance from Cipher earnings is not sufficient to pay for your
                monthly membership.
            </p>
            <PaymentMethod />
        </div>
    );
};

export default PaymentSettings;
