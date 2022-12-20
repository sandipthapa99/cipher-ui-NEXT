export type MyOrderProps = {
    total_pages: number;
    count: number;
    current: number;
    next: any;
    previous: any;
    page_size: number;
    result: Array<{
        id: string;
        user: string;
        currency: number;
        status: string;
        is_active: boolean;
        order_item: Array<{
            id: string;
            task: {
                id: string;
                title: string;
                images: Array<any>;
                entity_service_images: Array<any>;
                budget_type: string;
                assigner: {
                    id: string;
                    username: string;
                    email: string;
                    phone: any;
                    first_name: string;
                    middle_name: string;
                    last_name: string;
                    profile_image: string;
                    bio: string;
                    designation: string;
                };
                assignee: {
                    id: string;
                    username: string;
                    email: string;
                    phone: any;
                    first_name: string;
                    middle_name: string;
                    last_name: string;
                    profile_image: any;
                    bio: string;
                    designation: string;
                };
                currency: string;
            };
            created_at: string;
            updated_at: string;
            amount: number;
            tax: number;
            vat: number;
            offer_value: number;
            discount: number;
            platform_charge: number;
            platform_charge_discount: number;
            equipment_charges: number;
            revision_charges: number;
            other_charges: number;
            other_discounts: number;
            extra_data: Array<any>;
            is_active: boolean;
            order: string;
            offer: number;
        }>;
        grand_total: number;
    }>;
};
