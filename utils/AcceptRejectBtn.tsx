import BigButton from "@components/common/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "./axiosClient";
import { toast } from "./toast";

export enum APPROVAL_STATUS {
    pending = "pending",
    approved = "approved",
    rejected = "rejected",
    closed = "closed",
    cancelled = "cancelled",
}

export const RenderDifferentButton = (status: string, id: string) => {
    const queryClient = useQueryClient();

    const sendBookApproval = useMutation(
        (data: { booking: number | undefined }) =>
            axiosClient.post("/task/entity/service-booking/approval/", data)
    );
    const sendBookReject = useMutation(
        (data: { booking: number | undefined }) =>
            axiosClient.post("/task/entity/service-booking/reject/", data)
    );

    switch (status) {
        case APPROVAL_STATUS?.pending:
            return (
                <>
                    <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                        <BigButton
                            btnTitle={"Decline"}
                            backgroundColor={"#fff"}
                            handleClick={() => {
                                sendBookReject.mutate(
                                    {
                                        booking: parseInt(id),
                                    },
                                    {
                                        onSuccess: () => {
                                            toast.success("Booking Rejected");
                                            queryClient.invalidateQueries([
                                                "notifications",
                                            ]);
                                            // router.push("/home");
                                        },
                                        onError: (error: any) => {
                                            toast.error(
                                                error.response.data.booking
                                                    .message
                                            );
                                        },
                                    }
                                );
                            }}
                            textColor={"#211D4F"}
                            border="1px solid #211D4F"
                        />
                        <BigButton
                            btnTitle={"Approve"}
                            backgroundColor={"#211D4F"}
                            loading={sendBookApproval.isLoading}
                            handleClick={() => {
                                sendBookApproval.mutate(
                                    {
                                        booking: parseInt(id),
                                    },
                                    {
                                        onSuccess: () => {
                                            toast.success("Booking Approved");
                                            queryClient.invalidateQueries([
                                                "get-my-bookings",
                                            ]);
                                            queryClient.invalidateQueries([
                                                "notifications",
                                            ]);
                                        },
                                        onError: (error: any) => {
                                            toast.error(
                                                error.response.data.booking
                                                    .message
                                            );
                                        },
                                    }
                                );
                            }}
                            textColor={"#fff"}
                        />
                    </div>
                </>
            );
        case APPROVAL_STATUS?.approved:
            return (
                <div
                    className="d-flex align-items-center gap-3 approve-reject-buttons"
                    onClick={() =>
                        queryClient.invalidateQueries(["notifications"])
                    }
                >
                    <BigButton
                        btnTitle={"Approved"}
                        backgroundColor={"#32cd32"}
                        className="border-0"
                        loading={sendBookApproval.isLoading}
                        textColor={"#fff"}
                    />
                </div>
            );
        case APPROVAL_STATUS?.cancelled:
            return (
                <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                    <BigButton
                        btnTitle={"Cancelled"}
                        backgroundColor={"#32cd32"}
                        className="border-0"
                        loading={sendBookApproval.isLoading}
                        textColor={"#fff"}
                    />
                </div>
            );
        case APPROVAL_STATUS?.closed:
            return (
                <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                    <BigButton
                        btnTitle={"Closed"}
                        backgroundColor={"#FE5050"}
                        className="border-0"
                        loading={sendBookApproval.isLoading}
                        textColor={"#fff"}
                    />
                </div>
            );
        case APPROVAL_STATUS?.rejected:
            return (
                <div className="d-flex align-items-center gap-3 approve-reject-buttons">
                    <BigButton
                        btnTitle={"Rejected"}
                        backgroundColor={"#FE5050"}
                        className="border-0"
                        loading={sendBookApproval.isLoading}
                        textColor={"#fff"}
                    />
                </div>
            );
    }
};
