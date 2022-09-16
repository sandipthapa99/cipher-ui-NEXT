import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosClient } from "utils/axiosClient";

export interface Currency {
    id: number;
    name: string;
    code: string;
}
export interface TaskCurrencyProps extends Omit<SelectProps, "data"> {
    onCurrencyChange: (currencyId: number) => void;
}
export const useCurrencies = () => {
    return useQuery(["currencies"], () =>
        axiosClient
            .get<{ result: Currency[] }>("/locale/cms/currency/?page_size=1000")
            .then((response) => response.data.result)
    );
};
export const TaskCurrency = ({
    value,
    onCurrencyChange,
    ...rest
}: TaskCurrencyProps) => {
    const [currency, setCurrency] = useState(value);
    const { data: currencies = [] } = useCurrencies();
    const currencyData = currencies.map((currency) => ({
        id: currency,
        label: currency.code,
        value: currency.id.toString(),
    }));
    const handleCurrencyChange = (currencyId: number) => {
        setCurrency(currencyId.toString());
        onCurrencyChange(currencyId);
    };
    return (
        <Select
            {...rest}
            value={currency}
            required
            searchable
            label="Currency"
            placeholder="Select your currency"
            data={currencyData}
            onChange={(value) => handleCurrencyChange(Number(value))}
        />
    );
};
