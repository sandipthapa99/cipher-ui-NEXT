import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const MyTaskOrder = () => {
    return (
        <div className="my-task-order">
            <div className="d-flex justify-content-between align-items-center order-section">
                <span className="order-id">Order ID: #0330</span>
                <span className="ordered-date">
                    Order Placed : Wednesday, 03 June 2022
                </span>
            </div>

            <div className="order-detail-section">
                <Row>
                    <Col lg={2} md={6} sm={6} xs={12}>
                        <figure className="d-flex align-items-center justify-content-start h-100 w-100 order-detail-section__image">
                            <Image
                                src={"/business.png"}
                                alt="order-detail-image"
                                height={160}
                                width={130}
                            />
                        </figure>
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="title-and-description">
                            <h4>Root Canal Treatment (RCT)</h4>
                            <p>By Hary Clinic</p>
                            <div className="price-section">
                                <span className="price">Price : </span>
                                <span className="value">Rs.1500/hr</span>
                            </div>

                            <div className="price-section">
                                <span className="price">Duration : </span>
                                <span className="value">2 max hr/ week</span>
                            </div>

                            <div className="price-section">
                                <span className="price">Completed On : </span>
                                <span className="value">12 May 2022</span>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={4}>
                        <div className="badge-and-status w-100 d-flex">
                            <figure className="d-flex w-100 author-image">
                                <Image
                                    src="/userprofile/author.png"
                                    alt="author-image"
                                    height={62}
                                    width={40}
                                />
                            </figure>
                            <div className="d-flex justify-content-end align-items-center status-section">
                                <span className="status">Status</span>
                                <span className="status-value">Completed</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
