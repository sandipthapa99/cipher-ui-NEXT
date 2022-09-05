import EllipsisDropdown from "@components/common/EllipsisDropdown";
import { Tab } from "@components/common/Tab";
import Post from "@components/PostTask/Post";
import { Recent } from "@components/user/Recent";
import { Recommended } from "@components/user/Recommended";
import {
    faFilterList,
    faMagnifyingGlass,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@mantine/core";
import { useMyTasks } from "hooks/task/use-my-tasks";
import { useData } from "hooks/use-data";
import { useState } from "react";
import type { ServicesValueProps } from "types/serviceCard";
const SearchBySort = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    const [_, setShowModal] = useState(false);
    const { data: myTasks } = useMyTasks();
    const RenderInputBox = () => {
        return (
            <input
                type="text"
                className="h-100 w-100 search-input border-warning"
                placeholder="search"
            />
        );
    };
    const { data: servicesData } = useData<ServicesValueProps>(
        ["all-services"],
        "/task/service/"
    );

    return (
        <>
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
                            myTasks?.result?.length === 0 ? (
                                <Post />
                            ) : (
                                <Recent />
                            ),
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
                            <Popover width={300} trapFocus position="bottom">
                                <Popover.Target>
                                    <button className="btn">
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            className="svg-icon"
                                        />
                                    </button>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <RenderInputBox />
                                </Popover.Dropdown>
                            </Popover>
                        ),
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
        </>
    );
};
export default SearchBySort;
