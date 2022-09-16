import type { GoogleMapProps } from "@react-google-maps/api";
import {
    GoogleMap as ReactGoogleMap,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useLatLng } from "hooks/location/useLocation";
import React, { useCallback, useState } from "react";

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
    const [, setMap] = useState<google.maps.Map | undefined>();

    const location = useLatLng();

    const onLoad = useCallback((map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(undefined);
    }, []);

    return isLoaded ? (
        <ReactGoogleMap
            {...rest}
            mapContainerStyle={{ width: "100%", height: "60rem" }}
            center={location}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {location && <Marker position={location} label={"You are here"} />}
            {children}
        </ReactGoogleMap>
    ) : null;
};
export default GoogleMap;
