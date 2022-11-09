import { Tab } from "@components/common/Tab";
import { InProgress } from "@components/MyTasks/InProgress";
import { MyBookings } from "@components/MyTasks/MyBookings";
import { MyService } from "@components/MyTasks/MyService";
import { MyTasks } from "@components/MyTasks/MyTasks";
import { PaymentHistory } from "@components/MyTasks/PaymentHistory";
import { ToReview } from "@components/MyTasks/ToReview";
import { useState } from "react";
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
                        title: "My Services",
                        content: <MyService />,
                    },
                    {
                        title: "My Tasks",
                        content: <MyTasks />,
                    },
                    {
                        title: "Bookings",
                        content: <MyBookings />,
                    },
                    {
                        title: "Payment History",
                        content: <PaymentHistory />,
                    },
                ]}
            />
        </>
    );
};
export default SearchBySort;
