import CardBtn from "@components/common/CardBtn";
import { Modal } from "@mantine/core";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import type { OfferListingProps } from "types/offerListingProps";

export interface OfferDetailsProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    offerDetail: OfferListingProps[0];
}

export const OfferModel = ({
    show,
    setShow,
    offerDetail,
}: OfferDetailsProps) => {
    const { offer } = offerDetail;
    const { description, image, offer_type, title } = offer;
    return (
        <Modal
            opened={show}
            onClose={() => setShow(false)}
            centered
            className="offer-model"
            overlayOpacity={0.55}
            overlayBlur={3}
            size="xl"
        >
            <figure className="text-center mb-3">
                <Image
                    src={image ?? "/placeholder/profilePlaceholder.png"}
                    objectFit="contain"
                    height={400}
                    width={800}
                    placeholder="blur"
                    blurDataURL="/placeholder/profilePlaceholder.png"
                    alt="reward-image"
                />
            </figure>
            <h2>{title}</h2>
            <p>{description}</p>
            <p className="offer-model__expire">Expires On Jun 03 2023</p>
            <div className="d-flex justify-content-between align-items-center">
                <CardBtn
                    btnTitle={"Book Service"}
                    backgroundColor={"#211D4F"}
                />
                <span>sdsd</span>
            </div>
        </Modal>
    );
};
