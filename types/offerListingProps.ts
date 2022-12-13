export type OfferListingProps = Array<{
    id: number;
    offer: {
        id: number;
        title: string;
        description: string;
        image: string;
        offer_type: string;
        code: any;
    };
    booking: {
        id: number;
        entity_service: {
            id: string;
            title: string;
        };
    };
    redeem_date?: string;
    is_redeemed: boolean;
    is_active: boolean;
    redeem_by: string;
}>;
