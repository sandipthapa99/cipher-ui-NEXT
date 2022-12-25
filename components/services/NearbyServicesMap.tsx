import { Avatar } from "@mantine/core";
import { OverlayView } from "@react-google-maps/api";
import { useNearbyServices } from "hooks/service/use-nearby-services";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const GoogleMap = dynamic(() => import("@components/GoogleMap"), {
    ssr: false,
});

const NearbyServicesMap = () => {
    const { data: nearbyServices } = useNearbyServices();
    const router = useRouter();

    const handleAvatarClick = (serviceSlug: string) =>
        router.push(`/service/${serviceSlug}`);

    return (
        <GoogleMap>
            {nearbyServices.map(({ id, slug, city, created_by }) => (
                <OverlayView
                    position={{ lat: city?.latitude, lng: city?.longitude }}
                    mapPaneName="overlayMouseTarget"
                    key={id}
                >
                    <Avatar
                        src={created_by.profile_image}
                        radius="xl"
                        onClick={() => handleAvatarClick(slug)}
                    />
                </OverlayView>
            ))}
        </GoogleMap>
    );
};
export default NearbyServicesMap;
