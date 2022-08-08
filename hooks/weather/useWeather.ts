import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { axiosClient } from "utils/axiosClient"

const fetchWeather = async () => {
    const apiKey = "c9809d4018efd8b1a226080dc2e3d029";
    return axios(` https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${apiKey}`)
}


export const useWeather = () => {
    return useQuery(["weather"],fetchWeather)
}