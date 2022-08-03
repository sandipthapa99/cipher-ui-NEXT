import AppliedForm from "@components/AppliedTask/AppliedForm";
import {
    faCircleMinus,
    faCirclePlus,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { BookingDetails } from "staticData/bookNowModalCard";
import type { ServiceProviderCardProps } from "types/serviceDetail";

import BookNowButton from "./BookNowButton";

const SimpleProfileCard = ({
    image,
    name,
    speciality,
    startingPrice,
    isApplied,
    isPermission,
}: ServiceProviderCardProps) => {
    const [showModal, setShowModal] = useState(false);
    const [priceValue, setPriceValue] = useState(25);
    const [priceChanged, setPriceChanged] = useState(false);
    const [isWorking, setIsWorking] = useState(false);

    const handlePriceSave = () => {
        setPriceChanged(false);
    };
    return (
        <div className="simple-card my-5 my-lg-0 ">
            <div className="d-flex align-items-center simple-card__profile">
                <figure className="thumbnail-img">
                    <Image
                        src={image}
                        layout="fill"
                        objectFit="cover"
                        alt="serviceprovider-image"
                    />
                </figure>
                <div className="intro">
                    <p className="name">{name}</p>
                    <p className="job">{speciality}</p>
                </div>
            </div>

            {isApplied && isPermission && (
                <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row p-4 simple-card__price">
                    <span>Your Price</span>
                    <div className="d-flex price-edit">
                        <FontAwesomeIcon
                            icon={faCircleMinus}
                            onClick={() => {
                                setPriceValue(priceValue - 1);
                                setPriceChanged(true);
                            }}
                        />
                        <div className="d-flex align-items-center input-pricerange">
                            $
                            <input
                                type="text"
                                name="changed_price_value"
                                defaultValue={priceValue}
                            />
                        </div>
                        <FontAwesomeIcon
                            icon={faCirclePlus}
                            onClick={() => {
                                setPriceValue(priceValue + 1);
                                setPriceChanged(true);
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center flex-column flex-sm-row p-4 simple-card__price">
                <span>Budget Range</span>
                <span className="price">Rs {startingPrice}</span>
            </div>

            {isApplied &&
                isWorking &&
                (!priceChanged ? (
                    <BookNowButton
                        btnTitle="Leave Task"
                        backgroundColor="#FE5050"
                    />
                ) : (
                    <BookNowButton
                        btnTitle={"Save"}
                        backgroundColor={"#211D4F"}
                        handleOnClick={handlePriceSave}
                    />
                ))}

            {isApplied && !isWorking && (
                <>
                    {!priceChanged ? (
                        <BookNowButton
                            btnTitle={"Apply Now"}
                            backgroundColor={"#38C675"}
                            showModal={true}
                            handleOnClick={() => setShowModal(!showModal)}
                        />
                    ) : (
                        <BookNowButton
                            btnTitle={"Save"}
                            backgroundColor={"#211D4F"}
                            handleOnClick={() => setPriceChanged(false)}
                        />
                    )}
                </>
            )}

            {BookingDetails &&
                BookingDetails.map((detail) => (
                    <AppliedForm
                        key={detail.id}
                        title={detail.title}
                        price={detail.price}
                        image={detail.image}
                        description={detail.description}
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                    />
                ))}
        </div>
    );
};
export default SimpleProfileCard;
