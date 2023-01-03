import type { SelectItem, SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import type { FieldProps } from "formik";
import { Field } from "formik";
import { axiosClient } from "utils/axiosClient";

export interface Currency {
    name: string;
    code: string;
    symbol: any;
}
export interface TaskCurrencyProps extends Omit<SelectProps, "data"> {
    onCurrencyChange: (currencyCode: string) => void;
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
    name,
    ...rest
}: TaskCurrencyProps) => {
    const { data: currencies = [] } = useCurrencies();

    const currencyData = currencies.map((currency) => ({
        label: currency.code + ` (${currency.symbol})`,
        value: currency?.code?.toString(),
    }));

    return (
        <Field name={name}>
            {({ field }: FieldProps) => (
                <Select
                    {...rest}
                    {...field}
                    name={name}
                    value={value}
                    required
                    searchable
                    label="Currency"
                    placeholder="Select your currency"
                    data={currencyData}
                    onChange={onCurrencyChange}
                />
            )}
        </Field>
    );
};
