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
                    <Col md={2}>
                        <figure className="d-flex align-items-center justify-content-center h-100 w-100 order-detail-section__image">
                            <Image
                                src={"/business.png"}
                                alt="order-detail-image"
                                height={152}
                                width={130}
                            />
                        </figure>
                    </Col>
                    <Col md={6}>
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
                    <Col md={4}>
                        <span>Author</span>
                        <div className="status-section">
                            <span className="status">Status</span>
                            <span className="status-value">Completed</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
