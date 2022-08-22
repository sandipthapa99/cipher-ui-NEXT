import { faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useData } from "hooks/use-data";
import Link from "next/link";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { ServicesValueProps } from "types/serviceCard";

import ServiceCard from "./common/ServiceCard";

const Popular = () => {
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    console.log(servicesData);
    return (
        <section id="card-wrapper" className="card-wrapper mt-5">
            <Container fluid="xl">
                <div className="title-wrapper d-flex justify-content-between">
                    {/* <h2 className="heading-title">Community activity</h2> */}
                    <h2>Popular on Cipher</h2>
                    <Link href="/search">
                        <a className="view-more">
                            view more{" "}
                            <FontAwesomeIcon
                                icon={faAngleRight}
                                className="svg-icon"
                            />
                        </a>
                    </Link>
                </div>
                <Row className="gx-5">
                    {servicesData &&
                        servicesData?.data?.result?.map((service, key) => {
                            return (
                                <Col
                                    className="discover-col"
                                    sm={6}
                                    md={6}
                                    lg={3}
                                    key={key}
                                >
                                    <ServiceCard serviceCard={service} />
                                </Col>
                            );
                        })}
                </Row>
            </Container>
        </section>
    );
};

export default Popular;
