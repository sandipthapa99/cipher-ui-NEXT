import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import type { Weather } from "types/weather";

export const useLocation = () => {
    const [coords, setCoords] = useState<
        GeolocationPosition["coords"] | undefined
    >();

    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition((data) => {
            setCoords(data.coords);
        });
        return () => {
            setCoords(undefined);
        };
    }, []);
    return coords;
};
export const useWeather = () => {
    const getOpenWeatherApiKey = () => {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        if (apiKey === undefined)
            throw new Error(
                "Please specify an API key in the environment variable NEXT_PUBLIC_OPEN_WEATHER_API_KEY"
            );
        return apiKey;
    };
    const coords = useLocation();
    const openWeatherBaseUrl =
        "https://api.openweathermap.org/data/2.5/weather";
    const query = new URLSearchParams({
        lat: coords?.latitude.toString() as string,
        lon: coords?.longitude.toString() as string,
        units: "metric",
        appId: getOpenWeatherApiKey(),
    });

    const url = `${openWeatherBaseUrl}?${query.toString()}`;

    return useQuery(
        ["weather-data"],
        async () => {
            try {
                const { data } = await axios.get<Weather>(url);
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Failed to fetch weather data");
            }
        },
        { enabled: !!coords, retry: false }
    );
};
