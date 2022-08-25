import { Tab } from "@components/common/Tab";
import TaskCard from "@components/common/TaskCard";
import Post from "@components/PostTask/Post";
import { Recommended } from "@components/user/Recommended";
import {
    faFilterList,
    faMagnifyingGlass,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { progressTask, taskHistory } from "staticData/task";

const SearchBySort = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    return (
        <Row className="recommended-tab">
            {/* <div className="tabs"> */}
            <Col md={12} className="recomended">
                <Tab
                    activeIndex={activeTabIdx}
                    onTabClick={setActiveTabIdx}
                    items={[
                        {
                            title: "Recommended",
                            content: <Recommended />,
                        },
                        {
                            title: "Recent",
                            content: <Post />,
                        },
                        {
                            title: "In Progress",
                            content: <Recommended />,
                        },
                        {
                            title: "History",
                            content: <Recommended />,
                        },
                        {
                            title: "Draft",
                            content: <Recommended />,
                        },
                    ]}
                    icons={[
                        {
                            index: 0,
                            type: (
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="svg-icon"
                                />
                            ),
                        },
                        {
                            index: 1,
                            type: (
                                <FontAwesomeIcon
                                    icon={faFilterList}
                                    className="svg-icon"
                                />
                            ),
                        },
                    ]}
                />
            </Col>
        </Row>
    );
};
export default SearchBySort;
