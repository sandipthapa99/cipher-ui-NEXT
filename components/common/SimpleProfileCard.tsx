import Image from "next/image";
import { ServiceProviderCardProps } from "types/serviceDetail";
import CardBtn from "./CardBtn";
import Link from "next/link";
import { Button } from "react-bootstrap";
import BookNowButton from "./BookNowButton";
import { useState } from "react";
import ModalCard from "./ModalCard";
import { BookingDetails } from "staticData/bookNowModalCard";
const SimpleProfileCard = ({
    image,
    name,
    speciality,
    successRate,
    startingPrice,
    address,
    views,
    happyClients,
}: ServiceProviderCardProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="card-block d-flex align-items-stretch">
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
            <div className="starting-price">
                <p>Starting price</p>
                <p className="price">Rs {startingPrice}</p>
            </div>
            <BookNowButton
                btnTitle="Book Now"
                backgroundColor="$primary-color"
                showModal={true}
                handleOnClick={() => setShowModal(!showModal)}
            />
        </div>
    );
};
export default SimpleProfileCard;
