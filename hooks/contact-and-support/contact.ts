import { useMutation } from "@tanstack/react-query";
import type { ContactValuesProps } from "types/contact";
import { axiosClient } from "utils/axiosClient";

export const useContact = () => {
    return useMutation<void, Error, ContactValuesProps>(
        async (contactPayload) => {
            try {
                const { data } = await axiosClient.post(
                    "/support/cms/support/contactus",
                    contactPayload
                );
                console.log("Contact data", data);
            } catch (error) {
                throw new Error("Contact failed");
            }
        }
    );
};
