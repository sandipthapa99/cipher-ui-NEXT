import TaskList from "@components/AppliedTask/TaskList";
import BillingLocation from "@components/Checkout/BillingLocation";
import ExtraSection from "@components/Checkout/ExtraSection";
import Breadcrum from "@components/common/Breadcrum";
import PackageOffersCard from "@components/common/packageCard";
import Footer from "@components/Footer";
import Header from "@components/Header";
import MembershipCard from "@components/MembershipCard";
import Popular from "@components/Popular";
import SearchHeader from "@components/SearchTask/searchHeader";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { billingLocationContent } from "staticData/billingLocationData";
import { MembershipCardContent } from "staticData/membershipCard";
import { taskListContent } from "staticData/taskListData";

const Checkout = () => {
    console.log(taskListContent);
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
                    <Row className="g-5">
                        <Col lg={8}>
                            <BillingLocation
                                location={billingLocationContent.location}
                            />
                            <ExtraSection />
                        </Col>
                        <Col lg={4}>
                            <TaskList task={taskListContent} />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section
                id="membership-section"
                className="membership-section mt-5"
            >
                <Container>
                    <h1>Get membership</h1>
                    <Row className="gx-5 d-flex align-items-stretch">
                        {MembershipCardContent &&
                            MembershipCardContent.map((offer) => (
                                <Col
                                    className="align-items-stretch"
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    key={offer.id}
                                >
                                    <MembershipCard
                                        title={offer.title}
                                        price={offer.price}
                                        offers={offer.offers}
                                        isRecommended={offer.isRecommended}
                                        isPermium={offer.isPermium}
                                        advantage={offer.advantage}
                                    />
                                </Col>
                            ))}
                    </Row>
                </Container>
            </section>

            <Popular />
            <Popular />
            <Footer />
        </Fragment>
    );
};

export default Checkout;