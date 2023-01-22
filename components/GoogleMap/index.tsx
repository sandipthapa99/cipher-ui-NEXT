import FullPageLoader from "@components/common/FullPageLoader";
import { useInterval } from "@mantine/hooks";
import type { GoogleMapProps } from "@react-google-maps/api";
import {
    GoogleMap as ReactGoogleMap,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useLatLng } from "hooks/location/useLocation";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

export type LatLngLiteral = google.maps.LatLngLiteral;
export type GoogleMapOptions = google.maps.MapOptions;
export type Map = google.maps.Map;

const INITIAL_MAX_ZOOM_LEVEL = 12;

const getGoogleMapsApiKey = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    if (!apiKey) throw new Error("Google Maps API key is not defined");
    return apiKey;
};

const GoogleMap = ({ children, ...rest }: GoogleMapProps) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: getGoogleMapsApiKey(),
    });
    const [zoom, setZoom] = useState(6);

    const mapRef = useRef<Map | null>(null);

    const center = useLatLng();

    const options = useMemo<GoogleMapOptions>(
        () => ({
            disableDefaultUI: true,
        }),
        []
    );

    const onLoad = useCallback((map: Map) => {
        mapRef.current = map;
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
    }, []);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);
    const interval = useInterval(() => {
        setZoom((previousZoom) =>
            previousZoom < INITIAL_MAX_ZOOM_LEVEL
                ? previousZoom + 1
                : previousZoom
        );
    }, 50);

    useEffect(() => {
        interval.start();
        return interval.stop;
    }, [interval]);
    if (!isLoaded) return <FullPageLoader />;

    return isLoaded ? (
        <ReactGoogleMap
            {...rest}
            zoom={zoom}
            options={options}
            mapContainerStyle={{ width: "100%", height: "63rem" }}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {children}
        </ReactGoogleMap>
    ) : null;
};
export default GoogleMap;
