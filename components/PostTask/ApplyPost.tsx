import SearchBySort from "@components/SearchTask/searchPageSort";
import { Col, Row } from "react-bootstrap";

import GettingStartedTask from "../Task/GettingStartedCard";
import Post from "./Post";

const ApplyPost = () => {
    return (
        <div style={{ margin: "2rem 0 0 0 " }}>
            <Row>
                <Col md={8}>
                    <SearchBySort />
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <Post />
                </Col>
                <Col md={4}>
                    <div>
                        <GettingStartedTask />
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default ApplyPost;
