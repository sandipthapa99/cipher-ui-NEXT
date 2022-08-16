import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ExperienceValueProps } from "types/experienceValueProps";
import { axiosClient } from "utils/axiosClient";

export const useExperience = () => {
    return useMutation<void, Error, ExperienceValueProps>(
        async (formDetails) => {
            try {
                const { data } = await axiosClient.post(
                    "/tasker/experience/",
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
