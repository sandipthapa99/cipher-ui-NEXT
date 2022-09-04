import {
    useClearSearchedTaskers,
    useClearSearchQuery,
    useSearchQuery,
} from "@components/common/Search/searchStore";
import { TeamMembersCard } from "@components/common/TeamMembersCard";
import { faClose } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionIcon, Box, Highlight, Space } from "@mantine/core";
import type { Tasker } from "types/tasks";

export interface Props {
    taskers: Tasker[];
    onTaskClick: (taskerId: string) => void;
}
export const UserTaskCardList = ({ taskers, onTaskClick }: Props) => {
    const searchQuery = useSearchQuery();
    const clearSearchQuery = useClearSearchQuery();
    const clearSearchedTaskers = useClearSearchedTaskers();

    const handleClearSearchResults = () => {
        clearSearchQuery();
        clearSearchedTaskers();
    };

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
                    tasker={""}
                />
            </div>
        ));
    };
    return (
        <>
            {searchQuery && searchQuery.context === "tasker.Profile" ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Highlight highlight={searchQuery.query}>
                        {`Showing search result for ${searchQuery.query}`}
                    </Highlight>
                    <ActionIcon onClick={handleClearSearchResults}>
                        <FontAwesomeIcon icon={faClose} />
                    </ActionIcon>
                </Box>
            ) : (
                <p>
                    {taskers?.length} Tasker in Kathmandu,Bagmati Nepal (
                    {taskers?.length} new)
                </p>
            )}
            <Space h={10} />
            <div className="user-task-card-list">{renderTaskList()}</div>
        </>
    );
};
