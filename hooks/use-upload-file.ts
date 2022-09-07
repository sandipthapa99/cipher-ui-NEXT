import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

export interface UploadFilePayload {
    files: File | File[] | string;
    media_type: "image" | "video" | "pdf";
    url?: string;
    placeholder?: string;
}
export const useUploadFile = () => {
    return useMutation<number[], AxiosError, UploadFilePayload>(
        async (payload) => {
            const { files, media_type, url, placeholder } = payload;
            if (typeof files === "string") return [];
            const fileFormData = new FormData();
            const filesToUpload = Array.isArray(files) ? files : [files];
            if (filesToUpload.length <= 0) return [];
            for (const fileToUpload of filesToUpload) {
                fileFormData.append("medias", fileToUpload);
                fileFormData.append("media_type", media_type ?? "image");
                fileFormData.append("placeholder", placeholder ?? "file");
            }
            const { data } = await axiosClient.post<{ data: number[] }>(
                url ?? "/task/filestore/",
                fileFormData
            );
            return data.data;
        }
    );
};
