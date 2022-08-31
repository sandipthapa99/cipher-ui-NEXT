import { TeamMembersCard } from "@components/common/TeamMembersCard";
import Scrollbars from "react-custom-scrollbars";
import type { Tasker } from "types/tasks";

export interface Props {
    taskers: Tasker[];
    onTaskClick: (taskerId: string) => void;
}
export const UserTaskCardList = ({ taskers, onTaskClick }: Props) => {
    const renderTaskList = () => {
        return taskers?.map((item, index) => (
            <div
                className="team-member-card-user-card"
                key={index}
                onClick={() => onTaskClick?.(item?.user?.id)}
            >
                <TeamMembersCard
                    taskers={item}
                    image={item?.profile_image}
                    name={item?.full_name}
                    speciality={"Teacher"} //doesnt come from api
                    rating={item?.stats?.user_reviews}
                    happyClients={item?.stats?.happy_clients}
                    awardPercentage={item?.stats?.success_rate}
                    location={item?.address_line1 + " " + item?.address_line2}
                    distance={"2 km"}
                    bio={item?.bio}
                    charge={item?.charge_currency + " " + item?.hourly_rate}
                />
            </div>
        ));
    };
    return (
        <>
            <p>
                {taskers?.length} Tasker in Kathmandu,Bagmati Nepal (
                {taskers?.length} new)
            </p>
            <div className="user-card-container">
                <div className="user-task-card-list">{renderTaskList()}</div>
            </div>
        </>
    );
};
