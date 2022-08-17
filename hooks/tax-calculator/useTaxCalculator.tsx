import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "axios";
import type {
    TaxCalculatorValueProps,
    TaxResult,
} from "types/taxCalculatorValueProps";
import { axiosClient } from "utils/axiosClient";

export const useTaxCalculator = () => {
    return useMutation<TaxResult, Error, TaxCalculatorValueProps>(
        async (formDetails) => {
            try {
                // const { data } = await axiosClient.post<TaxResult>(
                //     "/support/tax-calculator/",
                //     formDetails
                // );
                const { data } = await axios.post<TaxResult>(
                    "http://172.16.16.70:8014/api/v1/support/tax-calculator/",
                    formDetails
                );
                return data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error?.response?.data?.message);
                }
                throw new Error("Something went wrong");
            }
        }
    );
};
