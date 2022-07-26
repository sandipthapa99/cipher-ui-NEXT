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
    rewardPercentage: string;
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
        <Row className="mt-4">
            <Col>
                <FontAwesomeIcon
                    color="#F98900"
                    className="svg-icon"
                    icon={faSmile}
                />
                <span>{happyCustomers}</span>
            </Col>
            <Col>
                <FontAwesomeIcon
                    className="svg-icon"
                    color="#0693E3"
                    icon={faMedal}
                />
                <span>{rewardPercentage}</span>
            </Col>
            <Col>
                <FontAwesomeIcon
                    className="svg-icon"
                    color="#752DE8"
                    icon={faBarChart}
                />
                <span>{taskCompleted}</span>
            </Col>
            <Col>
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
