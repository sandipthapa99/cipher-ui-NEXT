import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
interface Location {
    asn: string;
    city: string;
    continent_code: string;
    country: string;
    country_area: number;
    country_calling_code: string;
    country_capital: string;
    country_code: string;
    country_code_iso3: string;
    country_name: string;
    country_population: number;
    country_tld: string;
    currency: string;
    currency_name: string;
    in_eu: boolean;
    ip: string;
    languages: string;
    latitude: number;
    longitude: number;
    network: string;
    org: string;
    postal: string;
    region: string;
    region_code: string;
    timezone: string;
    utc_offset: string;
    version: string;
}

export const useLocation = () => {
    const [ipAddress, setIpaddress] = useState("");
    const getIpAddress = async () => {
        const res = await fetch("https://api64.ipify.org/?format=json");
        const data = await res.json();
        setIpaddress(data?.ip);
    };
    useEffect(() => {
        getIpAddress();
    }, []);
    console.log("abc", ipAddress);
    return useQuery<Location>(
        ["location"],
        async () => {
            try {
                const { data } = await axios.get<Location>(
                    `http://api.ipapi.com/api/${ipAddress}?access_key=782e6f574a0da6651331708f12c8caf1`
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Something went wrong");
            }
        },
        {
            enabled: ipAddress !== "",
        }
    );
};
