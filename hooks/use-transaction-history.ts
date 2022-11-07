import { QueryClient, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { axiosClient } from "utils/axiosClient";

interface TransactionHistory {
    total_pages: number;
    result: Array<{
        id: string;
        payment_method: {
            id: number;
            name: string;
            logo: string;
            type: string;
        };
        sender: {
            id: string;
            username: string;
            email: string;
            phone: any;
            first_name: string;
            middle_name: any;
            last_name: string;
            profile_image: string;
            bio: string;
            created_at: string;
        };
        receiver: {
            id: string;
            username: string;
            email: string;
            phone: any;
            first_name: string;
            middle_name: any;
            last_name: string;
            profile_image: string;
            bio: string;
            created_at: string;
        };
        currency: {
            id: number;
            name: string;
            code: string;
            symbol: string;
        };
        created_at: string;
        status: string;
        description: any;
        amount: number;
        transaction_type: string;
        extra_data: {
            id: string;
            amount: number;
            object: string;
            review: any;
            source: any;
            status: string;
            charges: {
                url: string;
                data: Array<any>;
                object: string;
                has_more: boolean;
                total_count: number;
            };
            created: number;
            invoice: any;
            currency: string;
            customer: any;
            livemode: boolean;
            metadata: any;
            shipping: any;
            processing: any;
            application: any;
            canceled_at: any;
            description: any;
            next_action: any;
            on_behalf_of: any;
            client_secret: string;
            receipt_email: string;
            transfer_data: any;
            amount_details: {
                tip: any;
            };
            capture_method: string;
            payment_method: any;
            transfer_group: any;
            amount_received: number;
            amount_capturable: number;
            last_payment_error: any;
            setup_future_usage: any;
            cancellation_reason: any;
            confirmation_method: string;
            payment_method_types: Array<string>;
            statement_descriptor: any;
            application_fee_amount: any;
            payment_method_options: {
                card: {
                    network: any;
                    installments: any;
                    mandate_options: any;
                    request_three_d_secure: string;
                };
            };
            automatic_payment_methods: any;
            statement_descriptor_suffix: any;
        };
        order: string;
    }>;
}

const queryClient = new QueryClient();
export const useGetTransactionHistory = (
    pageNumber?: number,
    pageSize?: string
) => {
    return useQuery(["GET-TRANSACTION", pageNumber, pageSize], async () => {
        try {
            const { data } = await axiosClient.get<TransactionHistory>(
                `/payment/transaction/?page=${pageNumber}&page_size=${pageSize}`
            );
            queryClient.invalidateQueries(["GET-TRANSACTION"]);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error?.response?.data?.message);
            }
            throw new Error("Something went wrong");
        }
    });
};
