import { Tab } from "@components/common/Tab";
import { MyBookings } from "@components/MyTasks/MyBookings";
import { MyTasks } from "@components/MyTasks/MyTasks";
import { PaymentHistory } from "@components/MyTasks/PaymentHistory";
import { TaskYouMayLike } from "@components/MyTasks/TaskYouMayLike";
import { useMyTasks } from "hooks/task/use-my-tasks";
import { useData } from "hooks/use-data";
import { useState } from "react";
import type { ServicesValueProps } from "types/serviceCard";
const SearchBySort = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);
    // my task is not used for some reason IDK...
    // const { data: myTasks } = useMyTasks();
    const RenderInputBox = () => {
        return (
            <input
                type="text"
                className="h-100 w-100 search-input border-warning"
                placeholder="search"
            />
        );
    };

    return (
        <>
            <Tab
                activeIndex={activeTabIdx}
                onTabClick={setActiveTabIdx}
                items={[
                    {
                        title: "My Tasks",
                        content: <MyTasks />,
                    },
                    {
                        title: "My Bookings",
                        content: <MyBookings />,
                    },
                    {
                        title: "Task You May Like",
                        content: <TaskYouMayLike />,
                    },
                    {
                        title: "Payment History",
                        content: <PaymentHistory />,
                    },
                    {
                        title: "Help",
                        content: <PaymentHistory />,
                    },
                ]}
                // icons={[
                //     {
                //         index: 0,
                //         type: (
                //             <Popover width={300} trapFocus position="bottom">
                //                 <Popover.Target>
                //                     <button className="btn">
                //                         <FontAwesomeIcon
                //                             icon={faMagnifyingGlass}
                //                             className="svg-icon"
                //                         />
                //                     </button>
                //                 </Popover.Target>
                //                 <Popover.Dropdown>
                //                     <RenderInputBox />
                //                 </Popover.Dropdown>
                //             </Popover>
                //         ),
                //     },
                //     {
                //         index: 1,
                //         type: (
                //             <EllipsisDropdown
                //                 showModal={true}
                //                 handleOnClick={() => setShowModal(true)}
                //             >
                //                 <FontAwesomeIcon
                //                     icon={faFilterList}
                //                     className="svg-icon"
                //                 />
                //             </EllipsisDropdown>
                //         ),
                //     },
                // ]}
            />
        </>
    );
};
export default SearchBySort;
