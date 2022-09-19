import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const PLACES_AUTOCOMPLETE_URL =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const locationString = req.query?.location;
    const location = locationString
        ? JSON.parse(locationString as string)
        : undefined;

    const config = {
        url: PLACES_AUTOCOMPLETE_URL,
        method: "get",
        params: {
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
            input: req.query.input,
            point: location ? `${location.lat},${location.lng}` : undefined,
            language: "en",
        },
    };
    const { data } = await axios(config);
    res.statusCode = 200;
    res.json({ data });
}
