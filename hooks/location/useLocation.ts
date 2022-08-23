import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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
    return useQuery<Location>(["location"], async () => {
        try {
            const { data } = await axios.get<Location>(
                `https://ipapi.co/json/`
            );
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
