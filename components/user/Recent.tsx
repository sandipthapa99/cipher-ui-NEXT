import TaskCard from "@components/common/TaskCard";
import { useMyTasks } from "hooks/task/use-my-tasks";
import { useData } from "hooks/use-data";
import React from "react";
import { Col, Row } from "react-bootstrap";

export const Recent = () => {
    // const { data: recentTask } = useMyTasks();
    //for tasks

    return (
        <div className="recommended-tab">
            <Row>
                {/* {recentTask?.result?.map((task: any, key: any) => (
                    <Col sm="12" key={key}>
                        <TaskCard task={task} />
                    </Col>
                ))} */}
                TO-BE IMP
            </Row>
        </div>
    );
};
