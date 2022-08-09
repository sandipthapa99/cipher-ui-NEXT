import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const fetchWeather = async (
    lat: number | undefined,
    lon: number | undefined
) => {
    const apiKey = "c9809d4018efd8b1a226080dc2e3d029";
    return axios.get(
        ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
};

export const useWeather = () => {
    const [allowed, setAllowed] = useState(false);

    const latitude = useRef<number | undefined>(undefined);
    const longitude = useRef<number | undefined>(undefined);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude.current = position.coords.latitude;
                longitude.current = position.coords.longitude;
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, [latitude, longitude]);
    useEffect(() => {
        navigator.geolocation.watchPosition(
            function (position) {
                const { latitude, longitude } = position.coords;
                console.log("i'm tracking you!");
                setAllowed(true);
            },
            function (error) {
                if (error.code == error.PERMISSION_DENIED)
                    console.log("you denied me :-(");
                setAllowed(false);
            }
        );
    }, []);

    // console.log(latitude, longitude);
    return useQuery(["weather"], () =>
        fetchWeather(latitude.current, longitude.current)
    );
};
