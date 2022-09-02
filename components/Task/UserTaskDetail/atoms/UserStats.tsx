import {
    faBarChart,
    faMedal,
    faSmile,
    faTire,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Row } from "react-bootstrap";

interface UserStatsProps {
    happyCustomers: number;
    rewardPercentage: number;
    taskCompleted: number;
    rank: string;
}

export const UserStats = ({
    happyCustomers,
    rewardPercentage,
    taskCompleted,
    rank,
}: UserStatsProps) => {
    return (
        <Row className="td-mt-24 justify-content-between">
            <Col className="type d-flex">
                <FontAwesomeIcon
                    color="#F98900"
                    className="svg-icon"
                    icon={faSmile}
                />
                <span>{happyCustomers}</span>
            </Col>
            <Col className="type d-flex">
                <FontAwesomeIcon
                    className="svg-icon"
                    color="#0693E3"
                    icon={faMedal}
                />
                <span>{rewardPercentage}</span>
            </Col>
            <Col className="type d-flex">
                <FontAwesomeIcon
                    className="svg-icon"
                    color="#752DE8"
                    icon={faBarChart}
                />
                <span>{taskCompleted}</span>
            </Col>
            <Col className="type d-flex">
                <FontAwesomeIcon
                    className="svg-icon"
                    icon={faTire}
                    color="#297796"
                />
                <span>{rank}</span>
            </Col>
        </Row>
    );
};
