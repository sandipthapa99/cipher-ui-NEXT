import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { EducationValueProps } from "types/educationValueProps";
import { axiosClient } from "utils/axiosClient";

export const useEducation = () => {
    return useMutation<void, Error, EducationValueProps>(
        async (formDetails) => {
            try {
                const { data } = await axiosClient.post(
                    "/tasker/education/",
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
