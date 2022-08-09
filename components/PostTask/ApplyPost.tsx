import SearchBySort from "@components/SearchTask/searchPageSort";
import { useClientTasks } from "context/ClientTaskContext";
import { Col, Row } from "react-bootstrap";

import GettingStartedTask from "../Task/GettingStartedCard";

const ApplyPost = () => {
    const { tasks } = useClientTasks();

    return (
        <div>
            <Row>
                <Col md={8}>
                    <SearchBySort />
                </Col>
                <Col md={4}>
                    <div className="getting-started">
                        <GettingStartedTask />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default ApplyPost;
