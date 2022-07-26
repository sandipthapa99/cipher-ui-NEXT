import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Container,Row } from "react-bootstrap";
import { servicesDiscover } from "staticData/services";

import ServiceCard from "./common/ServiceCard";

const Popular = () => {
    return (
        <section id="card-wrapper" className="card-wrapper mt-5">
            <Container>
                <div className="title-wrapper d-flex justify-content-between">
                    {/* <h2 className="heading-title">Community activity</h2> */}
                    <h2>Popular on Cipher</h2>
                    <a href="#!" className="view-more">
                        view more{" "}
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className="svg-icon"
                        />
                    </a>
                </div>
                <Row className="gx-5">
                    {servicesDiscover &&
                        servicesDiscover.map((service) => {
                            return (
                                <Col
                                    className="discover-col"
                                    sm={6}
                                    md={6}
                                    lg={3}
                                    key={service.id}
                                >
                                    <ServiceCard
                                        serviceImage={service.serviceImage}
                                        serviceTitle={service.serviceTitle}
                                        serviceProvider={
                                            service.serviceProvider
                                        }
                                        serviceProviderLocation={
                                            service.serviceProviderLocation
                                        }
                                        serviceDescription={
                                            service.serviceDescription
                                        }
                                        serviceRating={service.serviceRating}
                                        servicePrice={service.servicePrice}
                                        hasOffer={service.hasOffer}
                                        discountRate={service.discountRate}
                                        discountOn={service.discountOn}
                                    />
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </section>
    );
};

export default Popular;
