import TaskCard from "@components/common/TaskCard";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";
import type { ITaskApiResponse } from "types/task";

export const Recommended = () => {
    //for tasks

    const { data: recommendedTasks } = useData<ITaskApiResponse>(
        ["all-tasks"],
        "/task/"
    );
    return (
        <div className="recommended-tab">
            <Row>
                {recommendedTasks?.data?.result?.map((task: any, key: any) => (
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
                            slug={`/task/${task?.slug}`}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};
