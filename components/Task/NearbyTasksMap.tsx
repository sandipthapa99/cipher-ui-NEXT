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
            <GoogleMap>
                {nearbyTasks.map(
                    ({ id, entity_service: { slug, city, created_by } }) => (
                        <OverlayView
                            position={{
                                lat: city?.latitude,
                                lng: city?.longitude,
                            }}
                            mapPaneName="overlayMouseTarget"
                            key={id}
                        >
                            <Avatar
                                onClick={() => router.push(`/task/${slug}`)}
                                radius="xl"
                                src={created_by?.profile_image}
                            />
                        </OverlayView>
                    )
                )}
            </GoogleMap>
        </>
    );
};
export default NearbyTasksMap;
