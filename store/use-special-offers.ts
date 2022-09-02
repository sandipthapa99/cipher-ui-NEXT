import { createStore, useStore } from "zustand";

type SpecialOfferStore = {
    id: string;
    created_by: {
        id: string;
        email: string;
        full_name: string;
        profile_image: any;
    };
    category: {
        id: number;
        name: string;
        slug: string;
        icon: any;
    };
    city: {
        id: number;
        name: string;
        country: {
            id: number;
            name: string;
        };
    };
    images: any;
    created_at: string;
    updated_at: string;
    title: string;
    budget_type: string;
    budget_from: number;
    budget_to: any;
    status: string;
    description: string;
    highlights: string;
    views_count: number;
    location: any;
    happy_clients: any;
    success_rate: any;
    is_professional: boolean;
    is_online: boolean;
    video: any;
    no_of_revisions: number;
    discount_type: any;
    discount_value: any;
    is_active: boolean;
    slug: string;
};
interface SpecialOfferDetails {
    specialOfferDetails: any;
    setSpecialOfferDetails: (detail: any) => void;
}

export const specialOffer = createStore<SpecialOfferDetails>((set) => ({
    specialOfferDetails: undefined,
    setSpecialOfferDetails: (detail: any) =>
        set((state) => ({ ...state, specialOfferDetails: detail })),
}));
export const useSpecialOfferDetails = () =>
    useStore(specialOffer).specialOfferDetails;

export const useSetSpecialOfferDetails = () =>
    useStore(specialOffer).setSpecialOfferDetails;
