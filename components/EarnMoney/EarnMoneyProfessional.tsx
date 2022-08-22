import React from "react";
import { Container } from "react-bootstrap";
import { GetStartedCard } from "./GetStartedCard";

export const EarnMoneyProfessional = () => {
    return (
        <>
            <section
                id="earn-money-professional-top-section"
                className="earn-money-professional-top-section"
            >
                <Container className="px-5" fluid="xl">
                    Earn money professional video section
                </Container>
            </section>

            <section
                id="earn-money-professional-get-started-section"
                className="earn-money-professional-get-started-section"
            >
                <Container className="px-5" fluid="xl">
                    <GetStartedCard />
                </Container>
            </section>
        </>
    );
};
