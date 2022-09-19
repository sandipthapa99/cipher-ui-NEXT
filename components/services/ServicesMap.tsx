import GoogleMap from "@components/GoogleMap";
import { useSearchService } from "@components/services/ServiceLayout";
import { Avatar } from "@mantine/core";
import { OverlayView } from "@react-google-maps/api";
import { useRouter } from "next/router";
import type { ServicesValueProps } from "types/serviceCard";

const PLACEHOLDER_SERVICE_IMAGE = "/placeholder/taskPlaceholder.png";

interface ServiceAvatarProps {
    service: ServicesValueProps["result"][0];
}
export const ServicesMap = () => {
    const { data: services = [] } = useSearchService("");
    return (
        <GoogleMap>
            {services.map((service) => (
                <ServiceAvatar key={service.id} service={service} />
            ))}
        </GoogleMap>
    );
};
const ServiceAvatar = ({ service }: ServiceAvatarProps) => {
    const router = useRouter();
    const serviceImage =
        service?.images && service?.images?.length > 0
            ? service?.images[0]?.media ?? PLACEHOLDER_SERVICE_IMAGE
            : PLACEHOLDER_SERVICE_IMAGE;

    const serviceLocation: google.maps.LatLngLiteral = service?.city
        ? {
              lng: service?.city?.longitude ?? 0,
              lat: service?.city?.latitude ?? 0,
          }
        : { lng: 0, lat: 0 };

    return (
        <OverlayView
            position={serviceLocation}
            mapPaneName="overlayMouseTarget"
        >
            <Avatar
                onClick={() => router.push(`/service/${service.slug}`)}
                src={serviceImage}
                radius="xl"
            />
        </OverlayView>
    );
};
