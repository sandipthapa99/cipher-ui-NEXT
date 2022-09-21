import { Avatar } from "@mantine/core";
import { OverlayView } from "@react-google-maps/api";
import { useLatLng } from "hooks/location/useLocation";
import { useNearbyTasks } from "hooks/task/use-nearby-tasks";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const GoogleMap = dynamic(() => import("@components/GoogleMap"), {
    ssr: false,
});

const NearbyTasksMap = () => {
    const location = useLatLng();
    const { data: nearbyTasks } = useNearbyTasks(location);
    //! temporary workground for the issue of all tasks being rendered on the same position
    const nearbyTasksSeparated = nearbyTasks.map((nearbyTask, index) => ({
        ...nearbyTask,
        city: {
            ...nearbyTask.city,
            longitude: nearbyTask.city.longitude + index * 0.0001,
            latitude: nearbyTask.city.latitude + index * 0.0001,
        },
    }));
    const router = useRouter();
    return (
        <>
            <GoogleMap>
                {nearbyTasksSeparated.map((task) => (
                    <OverlayView
                        position={{
                            lat: task.city.latitude,
                            lng: task.city.longitude,
                        }}
                        mapPaneName="overlayMouseTarget"
                        key={task.id}
                    >
                        <Avatar
                            onClick={() => router.push(`/task/${task.slug}`)}
                            radius="xl"
                            src={task.created_by.profile_image}
                        />
                    </OverlayView>
                ))}
            </GoogleMap>
        </>
    );
};
export default NearbyTasksMap;
