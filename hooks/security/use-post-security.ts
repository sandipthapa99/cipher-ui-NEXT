import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Interface } from "readline";
import { axiosClient } from "utils/axiosClient";

interface SecurityQuestions {
    question: number;
    answer: string;
}

export const usePostSecurity = () => {
    return useMutation<void, Error, SecurityQuestions>(
        async (securityPayload) => {
            try {
                const { data } = await axiosClient.post(
                    "/tasker/security-answer/",
                    securityPayload
                );
            } catch (error) {
                if (error instanceof AxiosError) {
                    const values = Object.values(error?.response?.data);
                    throw new Error(values.join("\n"));
                }
                throw new Error("Something went wrong");
            }
        }
    );
};
