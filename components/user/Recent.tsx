import TaskCard from "@components/common/TaskCard";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { RecentProps } from "types/serviceCard";

interface Props {
    recentTask: RecentProps;
}
export const Recent = ({ recentTask }: Props) => {
    //for tasks

    return (
        <div className="recommended-tab">
            <Row>
                {recentTask?.result?.map((task: any, key: any) => (
                    <Col sm="12" key={key}>
                        <TaskCard
                            title={task?.title}
                            id={task?.id}
                            charge={task?.charge}
                            description={task?.description}
                            location={task?.location}
                            start_date={task?.start_date}
                            start_time={task?.start_time}
                            status={task?.status}
                            currency={task?.currency}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
