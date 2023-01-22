import { useMutation } from "@tanstack/react-query";
import type { changePasswordValueProps } from "types/changePasswordValueProps";
import { axiosClient } from "utils/axiosClient";

export const useChangePassword = () => {
    return useMutation<
        void,
        Error,
        Omit<changePasswordValueProps, "confirm_password">
    >(async (changePasswordPayload) => {
        // try {
        const { data } = await axiosClient.post(
            "/user/password/change/",
            changePasswordPayload
        );
        return data;
        // } catch (error) {
        //     if (error instanceof AxiosError) {
        //         throw new Error(error?.response?.data?.old_password[0]);
        //     }
        //     throw new Error("Change Password Failed ");
        // }
    });
};
