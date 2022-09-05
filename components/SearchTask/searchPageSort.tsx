import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { Tab } from "@components/common/Tab";
import TaskCard from "@components/common/TaskCard";
import Post from "@components/PostTask/Post";
import { Recent } from "@components/user/Recent";
import { Recommended } from "@components/user/Recommended";
import {
    faFilterList,
    faMagnifyingGlass,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import { useData } from "hooks/use-data";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { progressTask, taskHistory } from "staticData/task";
import type { RecentProps, ServicesValueProps } from "types/serviceCard";
const SearchBySort = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const RenderInputBox = () => {
        return (
            <input
                type="text"
                className="input"
                //value={search_category}
                placeholder="search"
            />
        );
    };
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );
    const { data: myTasks } = useData<RecentProps>(
        ["my-tasks"],
        "/task/my-task"
    );
    console.log("dsfsdf0", myTasks);

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
                            content:
                                myTasks?.data?.result?.length === 0 ? (
                                    <Post />
                                ) : myTasks ? (
                                    <Recent recentTask={myTasks} />
                                ) : null,
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
                                    onClick={() => setShowInput(!showInput)}
                                />
                            ),
                            iconContent: showInput ? <RenderInputBox /> : null,
                        },
                        {
                            index: 1,
                            type: (
                                <EllipsisDropdown
                                    showModal={true}
                                    handleOnClick={() => setShowModal(true)}
                                >
                                    <FontAwesomeIcon
                                        icon={faFilterList}
                                        className="svg-icon"
                                    />
                                </EllipsisDropdown>
                            ),
                        },
                    ]}
                />
            </Col>
        </Row>
    );
};
export default SearchBySort;
