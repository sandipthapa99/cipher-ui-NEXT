import Image from "next/image";
import { useState } from "react";
import { BookingDetails } from "staticData/bookNowModalCard";
import type { ServiceProviderCardProps } from "types/serviceDetail";

import BookNowButton from "./BookNowButton";
import ModalCard from "./ModalCard";

const ServiceProviderCard = ({
    image,
    name,
    speciality,
    successRate,
    startingPrice,
    address,
    views,
    happyClients,
    isAddServiceForm,
}: ServiceProviderCardProps) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };
    return (
        <>
            <div className="card-block align-items-stretch">
                <div className="profile">
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

                <div className="description">
                    <div className="type d-flex flex-col">
                        <figure className="thumbnail-img">
                            <Image
                                src="/icons/map.svg"
                                layout="fill"
                                objectFit="contain"
                                alt="Happy Face"
                            />
                        </figure>
                        <p>{address}</p>
                    </div>
                    <div className="type d-flex flex-col">
                        <figure className="thumbnail-img">
                            <Image
                                src="/icons/eye.svg"
                                layout="fill"
                                objectFit="contain"
                                alt="Eye"
                            />
                        </figure>
                        <p>{views}</p>
                        <p>&nbsp;Views</p>
                    </div>
                    <div className="type d-flex flex-col">
                        <figure className="thumbnail-img">
                            <Image
                                src="/icons/happy-face.svg"
                                layout="fill"
                                objectFit="contain"
                                alt="Happy Face"
                            />
                        </figure>
                        <p>{happyClients}</p>
                        <p>&nbsp;Happy Clients</p>
                    </div>

                    <div className="success-rate type d-flex flex-col">
                        <div className="count d-flex flex-row">
                            <figure className="thumbnail-img">
                                <Image
                                    src="/icons/badge.svg"
                                    layout="fill"
                                    objectFit="contain"
                                    alt="success icon"
                                />
                            </figure>
                            <p>{successRate}%</p>
                        </div>
                        <div className="analytics-title">
                            <p>&nbsp;Success Rate</p>
                        </div>
                    </div>
                </div>

                <div className="starting-price">
                    <p>Starting price</p>
                    <p className="price">Rs {startingPrice}</p>
                </div>
                {isAddServiceForm ? (
                    <span className="edit-add-service-button">
                        <BookNowButton
                            btnTitle="Edit Service"
                            backgroundColor="#fff"
                        />
                    </span>
                ) : (
                    <BookNowButton
                        btnTitle="Book Now"
                        backgroundColor="$primary-color"
                        //  showModal={true}
                        handleOnClick={handleShowModal}
                    />
                )}
            </div>
            {BookingDetails &&
                BookingDetails.map((detail) => (
                    <ModalCard
                        key={detail.id}
                        title={detail.title}
                        price={detail.price}
                        image={detail.image}
                        description={detail.description}
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                    />
                ))}
        </>
    );
};
export default ServiceProviderCard;
