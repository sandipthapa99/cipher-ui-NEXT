import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "utils/axiosClient";

export interface EditServiceResponse {
    status: "success" | "error";
    message: string;
    service_id: string;
}
export const useEditService = () => {
    return useMutation<EditServiceResponse, Error, any>((editServicePayload) =>
        axiosClient
            .patch<EditServiceResponse>(
                "/task/entity/service/",
                editServicePayload
            )
            .then((res) => res.data)
            .catch((error) => {
                const message = Object.values(error?.response?.data).join("\n");
                throw new Error(message ?? "Failed to edit service");
            })
    );
};
