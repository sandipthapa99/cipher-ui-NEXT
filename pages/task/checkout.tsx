import TaskList from "@components/AppliedTask/TaskList";
import BillingLocation from "@components/Checkout/BillingLocation";
import ExtraSection from "@components/Checkout/ExtraSection";
import PaymentMethod from "@components/Checkout/PaymentMethod";
import { BreadCrumb } from "@components/common/BreadCrumb";
import CheckoutEmpty from "@components/common/CheckoutEmpty";
import Layout from "@components/Layout";
import MembershipCard from "@components/MembershipCard";
import Popular from "@components/Popular";
import { PostCard } from "@components/PostTask/PostCard";
import Membership from "@components/settings/Membership";
import { MembershipPackage } from "@components/settings/MembershipPackage";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MembershipCardContent } from "staticData/membershipCard";
import { taskListContent } from "staticData/taskListData";
import { useBookNowDetails } from "store/use-book-now";

const Checkout = () => {
    const bookNowDetails = useBookNowDetails();

    return (
        <Fragment>
            <Layout title="Cipher | checkout">
                <section
                    id="task-checkout-section"
                    className="task-checkout-section"
                >
                    <BreadCrumb currentPage="Checkout" />
                    <Container fluid="xl">
                        <h1>Checkout</h1>
                        {bookNowDetails ? (
                            <Row className="g-5">
                                <Col lg={8}>
                                    <BillingLocation
                                        location={
                                            bookNowDetails?.serviceProviderLocation ??
                                            ""
                                        }
                                    />
                                    <ExtraSection />
                                    <PaymentMethod />
                                </Col>
                                <Col lg={4}>
                                    <TaskList task={taskListContent} />
                                </Col>
                            </Row>
                        ) : (
                            <CheckoutEmpty />
                        )}
                    </Container>
                </section>
                <section
                    id="membership-section"
                    className="membership-section mt-5"
                >
                    <Container fluid="xl">
                        <h1>Get membership</h1>
                        <div className="all-membership-details ">
                            <MembershipPackage />
                        </div>

                        {/* <Row className="gx-5 d-flex align-items-stretch">
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
                        </Row> */}
                    </Container>
                </section>

                <Popular />
                <Popular />
            </Layout>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
            />
        </Fragment>
    );
};

export default Checkout;
