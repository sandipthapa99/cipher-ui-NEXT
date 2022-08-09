import {
    faFilterList,
    faMagnifyingGlass,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Tab } from "@components/common/Tab";
import { useState } from "react";
import Post from "@components/PostTask/Post";
import { Recommended } from "@components/user/Recommended";
import { progressTask, taskHistory } from "staticData/task";
import TaskCard from "@components/common/TaskCard";

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
                            content: progressTask.map((task) => (
                                <Col sm="12" key={task.id}>
                                    <TaskCard
                                        title={task.title}
                                        charge={task.charge}
                                        description={task.description}
                                        location={task.location}
                                        date={task.date}
                                        time={task.time}
                                        isCompleted={task.isCompleted}
                                        isRunning={task.isRunning}
                                    />
                                </Col>
                            )),
                        },
                        {
                            title: "History",
                            content: taskHistory.map((task) => (
                                <Col sm="12" key={task.id}>
                                    <TaskCard
                                        title={task.title}
                                        charge={task.charge}
                                        description={task.description}
                                        location={task.location}
                                        date={task.date}
                                        time={task.time}
                                        isCompleted={task.isCompleted}
                                        isRunning={task.isRunning}
                                    />
                                </Col>
                            )),
                        },
                        {
                            title: "Draft",
                            content: taskHistory.map((task) => (
                                <Col sm="12" key={task.id}>
                                    <TaskCard
                                        title={task.title}
                                        charge={task.charge}
                                        description={task.description}
                                        location={task.location}
                                        date={task.date}
                                        time={task.time}
                                        isCompleted={task.isCompleted}
                                        isRunning={task.isRunning}
                                    />
                                </Col>
                            )),
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
