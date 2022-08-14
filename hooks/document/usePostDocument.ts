import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { PostDocumentValueProps } from "types/postDocument";
import { axiosClient } from "utils/axiosClient";

export const usePostDocument = () => {
    return useMutation<void, Error, PostDocumentValueProps>(
        async ({ file }) => {
            try {
                const { data } = await axiosClient.post("/tasker/document/", {
                    file,
                });
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
