import Image from "next/image";
import { useState } from "react";
import { ServiceProviderCardProps } from "types/serviceDetail";

import BookNowButton from "./BookNowButton";
const SimpleProfileCard = ({
    image,
    name,
    speciality,
    startingPrice,
}: ServiceProviderCardProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="simple-card-block">
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
        </div>
    );
};
export default SimpleProfileCard;
