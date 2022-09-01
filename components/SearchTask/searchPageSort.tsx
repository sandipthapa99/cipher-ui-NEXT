import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { Tab } from "@components/common/Tab";
import TaskCard from "@components/common/TaskCard";
import Post from "@components/PostTask/Post";
import { Recommended } from "@components/user/Recommended";
import {
    faFilterList,
    faMagnifyingGlass,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { progressTask, taskHistory } from "staticData/task";
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
    const queryClient = new QueryClient();
    const { data: abc } = queryClient.prefetchQuery("all-services");
    console.log(abc);

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
