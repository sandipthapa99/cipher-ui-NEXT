import { faLocationDot } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "hooks/location/useLocation";
import type { HTMLAttributes } from "react";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
} from "react-map-gl";

interface MapboxMapProps extends HTMLAttributes<HTMLDivElement> {
    longitude?: number;
    latitude?: number;
    width?: string;
    height?: string;
    zoom?: number;
    markerCoordinates?: unknown[];
}
const getMapBoxToken = () => {
    const mapBoxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
    if (mapBoxToken === undefined) {
        throw new Error("Mapbox token not found");
    }
    return mapBoxToken;
};

export const MapboxMap = ({
    longitude,
    latitude,
    width,
    height,
    markerCoordinates,
    zoom = 14,
    ...rest
}: MapboxMapProps) => {
    const { data: coords } = useLocation();
    const renderMultipleMarkers = (coordinates: any[]) => {
        return coordinates.map((coordinate, key) => (
            <Marker
                key={key}
                longitude={coordinate?.longitude}
                latitude={coordinate?.latitude}
            >
                <FontAwesomeIcon
                    icon={faLocationDot}
                    color="red"
                    size="2x"
                    style={{ cursor: "pointer" }}
                />
                <Popup
                    longitude={coordinate.longitude}
                    latitude={coordinate.latitude}
                >
                    Tasker {key} is here
                </Popup>
            </Marker>
        ));
    };
    return (
        <div {...rest}>
            <Map
                mapboxAccessToken={getMapBoxToken()}
                initialViewState={{
                    longitude: longitude ?? coords?.data?.longitude,
                    latitude: latitude ?? coords?.data?.latitude,
                    zoom,
                }}
                style={{
                    width: width ?? "100%",
                    height: height ?? "600px",
                    paddingBottom: "1rem",
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <NavigationControl />
                <FullscreenControl />
                <GeolocateControl />
                <Popup
                    longitude={longitude ?? coords?.data?.longitude ?? 0}
                    latitude={latitude ?? coords?.data?.latitude ?? 0}
                >
                    You are here
                </Popup>
                {markerCoordinates && markerCoordinates.length > 0
                    ? renderMultipleMarkers(markerCoordinates)
                    : null}
            </Map>
        </div>
    );
};
