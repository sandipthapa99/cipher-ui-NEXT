import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const fetchWeather = async (lat: number, lon: number) => {
    const apiKey = "c9809d4018efd8b1a226080dc2e3d029";
    return axios.get(
        ` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
};

export const useWeather = () => {
    let latitude: number;
    let longitude: number;
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, []);
    useEffect(() => {
        navigator.geolocation.watchPosition(
            function (position) {
                console.log("i'm tracking you!");
            },
            function (error) {
                if (error.code == error.PERMISSION_DENIED)
                    console.log("you denied me :-(");
            }
        );
    }, []);

    // console.log(latitude, longitude);
    return useQuery(["weather"], () => fetchWeather(latitude, longitude));
};
