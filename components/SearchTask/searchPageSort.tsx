import { Tab } from "@components/common/Tab";
import { AllList } from "@components/MyTasks/AllList";
import { ApprovedTask } from "@components/MyTasks/ApprovedTask";
import { MyBookings } from "@components/MyTasks/MyBookings";
import { MyOrder } from "@components/MyTasks/MyOrder";
import { PaymentHistory } from "@components/MyTasks/PaymentHistory";
import { useState } from "react";
const SearchBySort = () => {
    const [activeTabIdx, setActiveTabIdx] = useState(0);

    return (
        <>
            <Tab
                activeIndex={activeTabIdx}
                onTabClick={setActiveTabIdx}
                items={[
                    {
                        title: "My Listings",
                        content: <AllList />,
                    },
                    {
                        title: "Bookings",
                        content: <MyBookings />,
                    },
                    {
                        title: "Approved Task",
                        content: <ApprovedTask />,
                    },
                    {
                        title: "Orders",
                        content: <MyOrder />,
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
