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
    const router = useRouter();
    return (
        <>
            <GoogleMap center={location}>
                {nearbyTasks.map((task) => (
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
                            src={task.assigner.profile_image}
                        />
                    </OverlayView>
                ))}
            </GoogleMap>
        </>
    );
};
export default NearbyTasksMap;
