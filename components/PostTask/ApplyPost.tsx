import SearchBySort from "@components/SearchTask/searchPageSort";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

import GettingStartedTask from "../Task/GettingStartedCard";

const ApplyPost = () => {
    const router = useRouter();

    const query = router.query;
    return (
        <div className="post-task__apply-post">
            <Row>
                <Col md={Number(query.activeTab) === 4 ? 12 : 8}>
                    <SearchBySort />
                </Col>
                {Number(query.activeTab) !== 3 && (
                    <Col md={4}>
                        <div className="getting-started">
                            <GettingStartedTask />
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    );
};
export default ApplyPost;
