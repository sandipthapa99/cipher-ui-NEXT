import { faLocationDot } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { HTMLAttributes } from "react";
import Map, {
    FullscreenControl,
    GeolocateControl,
    Marker,
    NavigationControl,
    Popup,
} from "react-map-gl";

interface MapboxMapProps extends HTMLAttributes<HTMLDivElement> {
    longitude: number;
    latitude: number;
    width?: string;
    height?: string;
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
    ...rest
}: MapboxMapProps) => {
    return (
        <div {...rest}>
            <Map
                mapboxAccessToken={getMapBoxToken()}
                initialViewState={{
                    longitude,
                    latitude,
                    zoom: 14,
                }}
                style={{ width: width ?? "100%", height: height ?? "600px" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <NavigationControl />
                <FullscreenControl />
                <GeolocateControl />
                <Popup longitude={longitude} latitude={latitude}>
                    You are here
                </Popup>
                <Marker latitude={latitude} longitude={longitude}>
                    <FontAwesomeIcon
                        size="9x"
                        icon={faLocationDot}
                        className="map-marker"
                        color="#fe5050"
                    />
                </Marker>
            </Map>
        </div>
    );
};
