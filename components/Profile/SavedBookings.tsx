import ServiceCard from "@components/common/ServiceCard";
import TaskCard from "@components/common/TaskCard";
import { UserTaskCard } from "@components/Task/UserTaskCard/UserTaskCard";
import { SimpleGrid } from "@mantine/core";
import { useBookmarks } from "hooks/use-bookmarks";

const SavedBookings = () => {
    const { data: serviceBookmarks } = useBookmarks("service");
    const { data: taskBookmarks } = useBookmarks("task");
    const { data: userBookmarks } = useBookmarks("user");

    return (
        <div className="saved-bookings px-5">
            <SimpleGrid cols={3}>
                {serviceBookmarks.map((bookmark) => (
                    <ServiceCard
                        key={bookmark.id}
                        serviceCard={bookmark.data as any}
                    />
                ))}
                {taskBookmarks.map((taskBookmark) => (
                    <TaskCard
                        key={taskBookmark.id}
                        task={taskBookmark.data as any}
                    />
                ))}
                {userBookmarks.map((userBookmark) => (
                    <UserTaskCard
                        key={userBookmark.id}
                        task={userBookmark.data as any}
                        onTaskClick={(task) => console.log(task)}
                    />
                ))}
            </SimpleGrid>
        </div>
    );
};
export default SavedBookings;
