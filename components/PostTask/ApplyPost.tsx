import SearchBySort from "@components/SearchTask/searchPageSort";
import { Col, Row } from "react-bootstrap";

import GettingStartedTask from "../Task/GettingStartedCard";

const ApplyPost = () => {
    return (
        <div className="post-task__apply-post">
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
