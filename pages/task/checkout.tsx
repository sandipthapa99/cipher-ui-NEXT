import TaskList from "@components/AppliedTask/TaskList";
import BillingLocation from "@components/Checkout/BillingLocation";
import ExtraSection from "@components/Checkout/ExtraSection";
import PaymentMethod from "@components/Checkout/PaymentMethod";
import { BreadCrumb } from "@components/common/BreadCrumb";
import CheckoutEmpty from "@components/common/CheckoutEmpty";
import Layout from "@components/Layout";
import Popular from "@components/Popular";
import { PostCard } from "@components/PostTask/PostCard";
import { MembershipPackage } from "@components/settings/MembershipPackage";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import React, { Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { taskListContent } from "staticData/taskListData";
import { useBookNowDetails } from "store/use-book-now";

const Checkout = () => {
    const bookNowDetails = useBookNowDetails();

    return (
        <Fragment>
            <Layout title="Homaale | checkout">
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
