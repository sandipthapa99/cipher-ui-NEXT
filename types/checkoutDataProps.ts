export type CheckoutDataProps = {
    id: string;
    user: string;
    currency: number;
    status: string;
    is_active: boolean;
    order_item: Array<{
        id: string;
        item: {
            id: string;
            assigner: {
                id: string;
                username: string;
                email: string;
                phone: any;
                first_name: string;
                middle_name: string;
                last_name: string;
                profile_image: any;
                bio: string;
                created_at: string;
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
                created_at: string;
            };
            entity_service: {
                id: string;
                budget_type: string;
                budget_from: number;
                budget_to: number;
                images: Array<{
                    id: number;
                    name: string;
                    size: string;
                    media_type: string;
                    media: string;
                }>;
                videos: Array<any>;
            };
            currency: {
                id: number;
                name: string;
                code: string;
                symbol: string;
            };
            created_at: string;
            updated_at: string;
            is_active: boolean;
            status: string;
            title: string;
            description: string;
            requirements: string;
            charge: number;
            location: string;
            estimated_time: number;
            slug: string;
            start_date: string;
            end_date: string;
            completed_on: any;
            start_time: string;
            end_time: any;
            extra_data: Array<any>;
            booking: number;
            city: number;
            images: Array<any>;
            videos: Array<any>;
        };
        created_at: string;
        updated_at: string;
        object_id: string;
        amount: number;
        tax: number;
        vat: number;
        offer: number;
        discount: number;
        platform_charge: number;
        platform_charge_discount: number;
        equipment_charges: number;
        revision_charges: number;
        other_charges: number;
        other_discounts: number;
        extra_data: any;
        is_active: boolean;
        content_type: number;
        order: string;
    }>;
};
