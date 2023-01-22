import { faClose, faLocation } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { AutocompleteProps } from "@mantine/core";
import { Loader } from "@mantine/core";
import { ActionIcon } from "@mantine/core";
import { Autocomplete } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLatLng } from "hooks/location/useLocation";
import React, { useEffect, useState } from "react";
import type { GooglePlacesResponse } from "types/googlePlacesResponse";

interface PlacesAutocompleteProps extends Omit<AutocompleteProps, "data"> {
    onPlaceChange: (place: string) => void;
    disabled?: boolean;
}

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
export const PlacesAutocomplete = ({
    value,
    onPlaceChange,
    disabled,
    ...props
}: PlacesAutocompleteProps) => {
    const [input, setInput] = useState(value ?? "");

    const location = useLatLng();
    const { data: predictions, isFetching: isLoading } = usePlaces(
        input,
        JSON.stringify(location)
    );

    const autocompleteData = predictions.map((prediction) => ({
        value: prediction.description,
    }));

    const handleChange = (value: string) => {
        setInput(value);
        onPlaceChange(value);
    };
    const clearSearchQuery = () => setInput("");

    useEffect(() => setInput(value ?? ""), [value]);

    return (
        <Autocomplete
            {...props}
            icon={<FontAwesomeIcon icon={faLocation} />}
            rightSection={
                input && !isLoading ? (
                    <ActionIcon disabled={disabled} onClick={clearSearchQuery}>
                        <FontAwesomeIcon icon={faClose} />
                    </ActionIcon>
                ) : isLoading ? (
                    <Loader size="sm" />
                ) : undefined
            }
            data={autocompleteData}
            value={input}
            onChange={handleChange}
            disabled={disabled}
        />
    );
};
