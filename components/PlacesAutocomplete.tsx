import { faClose, faLocation } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AutocompleteProps } from "@mantine/core";
import { Loader } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { Autocomplete } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLatLng } from "hooks/location/useLocation";
import React, { useState } from "react";
import type { GooglePlacesResponse } from "types/googlePlacesResponse";

type PlacesAutocompleteProps = Omit<AutocompleteProps, "data">;

const usePlaces = (input: string, location: string) =>
    useQuery(
        ["google-places", input],
        () =>
            axios
                .get<GooglePlacesResponse>(
                    `/api/google-places?input=${input}&location=${location}`
                )
                .then((response) => response.data.data.predictions),
        {
            enabled: !!(input && input.length > 2),
            initialData: [],
        }
    );
export const PlacesAutocomplete = (props: PlacesAutocompleteProps) => {
    const [input, setInput] = useState("");

    const location = useLatLng();
    const { data: predictions, isFetching: isLoading } = usePlaces(
        input,
        JSON.stringify(location)
    );

    const autocompleteData = predictions.map((prediction) => ({
        value: prediction.description,
    }));

    const clearSearchQuery = () => setInput("");

    return (
        <Autocomplete
            {...props}
            icon={<FontAwesomeIcon icon={faLocation} />}
            rightSection={
                input && !isLoading ? (
                    <ActionIcon onClick={clearSearchQuery}>
                        <FontAwesomeIcon icon={faClose} />
                    </ActionIcon>
                ) : isLoading ? (
                    <Loader size="sm" />
                ) : undefined
            }
            data={autocompleteData}
            value={input}
            onChange={setInput}
        />
    );
};
