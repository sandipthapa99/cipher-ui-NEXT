import Layout from "@components/Layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "hooks/use-form";
import React from "react";
import { Container } from "react-bootstrap";
import { axiosClient } from "utils/axiosClient";

import CheckoutForm from "../components/CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Checkout() {
    const { mutate, isLoading } = useForm();

    const { data: stripeData } = useQuery(["stripe-data"], async () => {
        const response = await axiosClient.post("/payment/intent/stripe/", {
            scope: "task",
            pk: "9915b353-e4d1-4dd4-be22-7cf6943637fe",
        });
        return response;
    });
    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret: stripeData?.data?.data?.client_secret,
        appearance,
    };
    console.log("client: ", options.clientSecret);

    return (
        <Layout>
            <Container>
                <div className="App d-flex justify-content-center align-items-center mt-5 mb-5">
                    {options.clientSecret && (
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm />
                        </Elements>
                    )}
                </div>
            </Container>
        </Layout>
    );
}
