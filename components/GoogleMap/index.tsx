import {
    GoogleMap as ReactGoogleMap,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api";
import { useLocation } from "hooks/location/useLocation";
import React, { useCallback, useMemo, useState } from "react";

const getGoogleMapsApiKey = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    if (!apiKey) throw new Error("Google Maps API key is not defined");
    return apiKey;
};
const GoogleMap = () => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: getGoogleMapsApiKey(),
    });
    const { data: locationResponse } = useLocation();
    const [, setMap] = useState<google.maps.Map | undefined>();

    const location = useMemo(
        () =>
            locationResponse
                ? {
                      lat: locationResponse.data.latitude,
                      lng: locationResponse.data.longitude,
                  }
                : undefined,
        [locationResponse]
    );

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
            mapContainerStyle={{ width: "100%", height: "60rem" }}
            center={location}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {location && <Marker position={location} label={"You are here"} />}
        </ReactGoogleMap>
    ) : null;
};
export default GoogleMap;
