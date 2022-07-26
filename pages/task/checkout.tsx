import BillingLocation from "@components/Checkout/BillingLocation";
import Breadcrum from "@components/common/Breadcrum";
import Footer from "@components/Footer";
import Header from "@components/Header";
import SearchHeader from "@components/SearchTask/searchHeader";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { billingLocationContent } from "staticData/billingLocationData";

const Checkout = () => {
    return (
        <Fragment>
            <SearchHeader />
            <Header />
            <section
                id="task-checkout-section"
                className="task-checkout-section"
            >
                <Container fluid="xl">
                    <Breadcrum currentPage={"Checkout"} />
                    <h1>Checkout</h1>
                    <Row>
                        <Col lg={7}>
                            <BillingLocation
                                location={billingLocationContent.location}
                            />
                        </Col>
                        <Col lg={5}>asdsad</Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </Fragment>
    );
};

export default Checkout;
