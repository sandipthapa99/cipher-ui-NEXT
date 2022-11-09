import SearchBySort from "@components/SearchTask/searchPageSort";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

import GettingStartedTask from "../Task/GettingStartedCard";

const ApplyPost = () => {
    const router = useRouter();

    const query = router.query;
    return (
        <div className="post-task__apply-post">
            <SearchBySort />
        </div>
    );
};
export default ApplyPost;
