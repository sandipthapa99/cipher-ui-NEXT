import {
    faAward,
    faEye,
    faFaceSmileBeam,
    faLocationDot,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
// import { BookingDetails } from "staticData/bookNowModalCard";
import type { ServiceProviderCardProps } from "types/serviceDetail";

import BookNowButton from "./BookNowButton";
import ModalCard from "./BookNowModalCard";

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
                    <div className="description__icon d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="svg-icon svg-icon-location"
                        />
                        <span>{address}</span>
                    </div>
                    <div className="description__icon d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faEye}
                            className="svg-icon svg-icon-eye"
                        />
                        <span>{views}</span>
                        <span>&nbsp;Views</span>
                    </div>
                    <div className="description__icon d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faFaceSmileBeam}
                            className="svg-icon svg-icon-smile"
                        />
                        <span>{happyClients}</span>
                        <span>&nbsp;Happy Clients</span>
                    </div>

                    <div className="description__icon d-flex align-items-center">
                        <FontAwesomeIcon
                            icon={faAward}
                            className="svg-icon svg-icon-eye"
                        />
                        <span>{successRate}%</span>
                        <span>&nbsp;Success Rate</span>
                    </div>
                </div>

                <div className="d-flex justify-content-around starting-price">
                    <p>Starting price</p>
                    <p className="price">Rs {startingPrice}</p>
                </div>
                {!isAddServiceForm ? (
                    <span className="edit-add-service-button">
                        <BookNowButton
                            btnTitle="Edit Service"
                            backgroundColor="#fff"
                            handleOnClick={handleShowModal}
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
            {/* {BookingDetails &&
                BookingDetails.map((detail) => (
                    <ModalCard
                        key={detail.id}
                        setShow={setShowModal}
                        title={detail.title}
                        price={detail.price}
                        image={detail.image}
                        description={detail.description}
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                    />
                ))} */}
        </>
    );
};
export default ServiceProviderCard;
