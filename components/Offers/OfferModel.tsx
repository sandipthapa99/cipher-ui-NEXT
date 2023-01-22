import CardBtn from "@components/common/CardBtn";
import type { SelectItem } from "@mantine/core";
import { Modal, Select } from "@mantine/core";
import { DISCOUNT_TYPES_OPTIONS } from "constants/OffersTypes";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import React from "react";
import type { AllOffersProps } from "types/allOffersProps";
import type { OfferListingProps } from "types/offerListingProps";

export interface OfferDetailsProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    offerDetail?: OfferListingProps[0];
    offerBasic?: AllOffersProps["result"][0];
}

export const OfferModel = ({
    show,
    setShow,
    offerDetail,
    offerBasic,
}: OfferDetailsProps) => {
    const { offer } = offerDetail ?? ({} as OfferListingProps[0]);

    const router = useRouter();
    const {
        description,
        image,
        title,
        end_date,
        discount_type,
        discount,
        discount_limit,
        entity_services,
    } = offer ?? offerBasic ?? ({} as AllOffersProps["result"][0]);

    const renderDiscountType = () => {
        switch (discount_type) {
            case DISCOUNT_TYPES_OPTIONS.Percentage:
                return "%";
            case DISCOUNT_TYPES_OPTIONS.Amount:
                return " Rs";
            default:
                return null;
        }
    };

    const serviceSelect: SelectItem[] = entity_services.map((service) => ({
        id: service.id,
        label: service.title,
        value: service.slug,
    }));

    const [isSelected, setIsSelected] = useState(true);

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
            <div className="offer-model__header">
                <h2>{title}</h2>
                <span className="offer-model__header--discount">
                    {discount} {discount_limit ? `- ${discount_limit}` : null}
                    {renderDiscountType()}
                </span>
            </div>

            <p>{description}</p>
            {end_date && (
                <p className="offer-model__expire">
                    Expires On {format(new Date(end_date), "PP")}
                </p>
            )}

            <div>
                <Formik
                    initialValues={{ slug: "" }}
                    onSubmit={(values) =>
                        router.push(`/service/${values.slug}`)
                    }
                >
                    {({ setFieldValue }) => {
                        return (
                            <Form className="d-flex justify-content-between align-items-center">
                                <Select
                                    name="slug"
                                    data={serviceSelect}
                                    placeholder="Select an available service"
                                    nothingFound="Nothing found"
                                    onChange={(data) => {
                                        setFieldValue("slug", data);
                                        setIsSelected(false);
                                    }}
                                    searchable
                                    creatable
                                />
                                <CardBtn
                                    btnTitle={"Book Service"}
                                    backgroundColor={"#211D4F"}
                                    disabled={isSelected}
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </Modal>
    );
};
