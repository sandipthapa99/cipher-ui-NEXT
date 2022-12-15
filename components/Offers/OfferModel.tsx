import CardBtn from "@components/common/CardBtn";
import { Modal } from "@mantine/core";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

export interface OfferDetailsProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

export const OfferModel = ({ show, setShow }: OfferDetailsProps) => {
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
                    src={"/placeholder/profilePlaceholder.png"}
                    objectFit="cover"
                    height={400}
                    width={400}
                    alt="reward-image"
                />
            </figure>
            <h2>Makeup Durbar Pvt. Ltd.</h2>
            <p>
                LARQ uses crisp product images and animations to make us
                genuinely excited about something as simple as drinking water
                The reusable water bottle retailer persuades us to join their
                Bottle Movement and explore more of their stylish products.
            </p>
            <p className="offer-model__expire">Expires On Jun 03 2023</p>
            <div>
                <CardBtn
                    btnTitle={"Book Service"}
                    backgroundColor={"#211D4F"}
                />
            </div>
        </Modal>
    );
};
