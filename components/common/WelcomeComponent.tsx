import { SearchBody } from "@components/SearchTask/searchBody";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { SearchBodyData } from "staticData/searchBody";

export const WelcomeComponent = () => {
    return (
        <Row className="user-stats">
            <Col md={7} className="user-details">
                <div className="user-name">
                    <h1>Hi Harry!</h1>
                    <h1>Welcome Back!</h1>
                </div>
            </Col>
            <Col md={5} className="user-stat-card">
                {SearchBodyData.map((data) => {
                    return (
                        <SearchBody
                            key={data.id}
                            number={data.number}
                            color={data.color}
                            textOne={data.textOne}
                            textColor={data.textColor}
                        />
                    );
                })}
            </Col>
        </Row>
    );
};
