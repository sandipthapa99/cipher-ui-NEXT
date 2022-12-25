import AdvertisementCard from "@components/common/AdvertisementCard";
import TaskerLayout from "@components/Tasker/TaskerLayout";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@components/GoogleMap"), {
    ssr: false,
});
const TaskerPage: NextPage = () => {
    return (
        <>
            <TaskerLayout>
                <GoogleMap />
                {/* <AdvertisementCard
                    title="Gardening Services"
                    type="The Merch"
                    currency="Rs"
                    price="1250.00"
                    buttonTitle="Book Now"
                    cardImage="/service-details/garden-cleaning.png"
                /> */}
            </TaskerLayout>
        </>
    );
};
export default TaskerPage;
