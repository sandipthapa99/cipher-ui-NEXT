import { useMutation } from "@tanstack/react-query";
import type { ContactValuesProps } from "types/contact";
import { axiosClient } from "utils/axiosClient";

export const useContact = () => {
    return useMutation<void, Error, ContactValuesProps>(
        async (contactPayload) => {
            try {
                const { data } = await axiosClient.post(
                    "/support/contactus/",
                    contactPayload
                );
            } catch (error) {
                throw new Error("Contact failed");
            }
        }
    );
};
