import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
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
    onCurrencyChange,
    ...rest
}: TaskCurrencyProps) => {
    const { data: currencies = [] } = useCurrencies();
    const currencyData = currencies.map((currency) => ({
        id: currency,
        label: currency.code,
        value: currency.id.toString(),
    }));
    return (
        <Select
            {...rest}
            required
            searchable
            label="Currency"
            placeholder="Select your currency"
            data={currencyData}
            onChange={(value) => onCurrencyChange(Number(value))}
        />
    );
};
