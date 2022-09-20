import { faLocation } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, createStyles, Text } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import type { GoogleMapProps } from "@react-google-maps/api";
import { OverlayView } from "@react-google-maps/api";
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

type LatLngLiteral = google.maps.LatLngLiteral;
type GoogleMapOptions = google.maps.MapOptions;
type Map = google.maps.Map;

const getGoogleMapsApiKey = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
    if (!apiKey) throw new Error("Google Maps API key is not defined");
    return apiKey;
};

const GoogleMap = ({ children, ...rest }: GoogleMapProps) => {
    const { classes } = useStyles();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: getGoogleMapsApiKey(),
    });

    const [zoom, setZoom] = useState(6);

    const mapRef = useRef<Map | null>(null);

    const location = useLatLng();
    const center = useMemo<LatLngLiteral>(() => location, [location]);
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

    const interval = useInterval(
        () =>
            setZoom((previousZoom) =>
                previousZoom < 18 ? previousZoom + 1 : previousZoom
            ),
        100
    );
    useEffect(() => {
        interval.start();
        return interval.stop;
    }, [interval]);

    return isLoaded ? (
        <ReactGoogleMap
            {...rest}
            options={options}
            mapContainerStyle={{ width: "100%", height: "60rem" }}
            center={center}
            zoom={zoom}
            onZoomChanged={() => setZoom(mapRef.current?.getZoom() ?? 0)}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <OverlayView mapPaneName="floatPane" position={location}>
                <Box className={classes.currentLocationWindow}>
                    <FontAwesomeIcon color="red" icon={faLocation} />
                    <Text>You are here</Text>
                </Box>
            </OverlayView>
            {children}
        </ReactGoogleMap>
    ) : null;
};
const useStyles = createStyles(() => ({
    currentLocationWindow: {
        backgroundColor: "#F9CA6A",
        color: "#000",
        padding: "1rem",
        borderRadius: ".4rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
}));
export default GoogleMap;
