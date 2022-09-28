import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosClient } from "utils/axiosClient";

export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: any;
}
export interface TaskCurrencyProps extends Omit<SelectProps, "data"> {
    onCurrencyChange: (currencyId: number) => void;
    data?: SelectItem[];
}
export const useCurrencies = () => {
    return useQuery(["currencies"], () =>
        axiosClient
            .get<Currency[]>("/locale/currency/options/")
            .then((response) => response.data)
    );
};
export const TaskCurrency = ({
    value,
    onCurrencyChange,
    ...rest
}: TaskCurrencyProps) => {
    const { data: currencies = [] } = useCurrencies();

    const defaultCurrency = currencies.find((value) => value.code === "NPR");

    const [currency, setCurrency] = useState(() => value);

    const currencyData = currencies.map((currency) => ({
        id: currency,
        label: currency.code + ` (${currency.symbol})`,
        value: currency.id.toString(),
    }));
    const handleCurrencyChange = (currencyId: number) => {
        setCurrency(currencyId.toString());
        onCurrencyChange(currencyId);
    };
    return (
        <Select
            {...rest}
            value={
                currency
                    ? currency
                    : defaultCurrency
                    ? String(defaultCurrency.id)
                    : ""
            }
            required
            searchable
            label="Currency"
            placeholder="Select your currency"
            data={currencyData}
            onChange={(value) => handleCurrencyChange(Number(value))}
        />
    );
};
