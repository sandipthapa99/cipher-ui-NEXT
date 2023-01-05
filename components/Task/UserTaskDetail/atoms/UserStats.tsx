import { faSmile, faTire } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@mantine/core";
import {
    RecommendOutlined,
    SentimentVerySatisfiedOutlined,
    TaskOutlined,
    WorkspacePremium,
} from "@mui/icons-material";
import React from "react";

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
        <div className="d-flex align-items-center gap-5 mt-4">
            <Tooltip.Floating label="Happy Clients" color={"blue"}>
                <div className="type">
                    <SentimentVerySatisfiedOutlined
                        style={{ color: "#F98900" }}
                        className="svg-icon"
                    />
                    <span>{happyCustomers}</span>
                </div>
            </Tooltip.Floating>
            <Tooltip.Floating label="Success Rate" color={"blue"}>
                <div className="type">
                    <RecommendOutlined
                        className="svg-icon"
                        style={{ color: "#0693E3" }}
                    />
                    <span>{+rewardPercentage?.toFixed(2)}%</span>
                </div>
            </Tooltip.Floating>
            <Tooltip.Floating label="Task Done" color={"blue"}>
                <div className="type">
                    <TaskOutlined
                        className="svg-icon"
                        style={{ color: "#752DE8" }}
                    />
                    <span>{taskCompleted}</span>
                </div>
            </Tooltip.Floating>
            <Tooltip.Floating label="Badge" color={"blue"}>
                <div className="type">
                    <WorkspacePremium
                        className="svg-icon"
                        style={{ color: "#297796" }}
                    />
                    <span>{rank}</span>
                </div>
            </Tooltip.Floating>
        </div>
    );
};
