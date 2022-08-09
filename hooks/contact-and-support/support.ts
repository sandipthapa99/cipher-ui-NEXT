import { useMutation } from "@tanstack/react-query";
import type { FeedbackValuesProps } from "types/contact";
import { axiosClient } from "utils/axiosClient";

export const useFeedback = () => {
    return useMutation<void, Error, FeedbackValuesProps>(
        async (feedbackPayload) => {
            try {
                const { data } = await axiosClient.post(
                    "/support/cms/support/feedback",
                    feedbackPayload
                );
                return data;
            } catch (err) {
                throw new Error("Feedback failed");
            }
        }
    );
};
