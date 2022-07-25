import Image from "next/image";
import { ServiceProviderCardProps } from "types/serviceDetail";
import BookNowButton from "./BookNowButton";
import { useState } from "react";
import CardBtn from "./CardBtn";
const SimpleProfileCard = ({
    image,
    name,
    speciality,
    startingPrice,
}: ServiceProviderCardProps) => {
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
            <div className="d-flex justify-content-around align-items-center flex-column flex-sm-row p-4 simple-card__price">
                <span>Starting price</span>
                <span className="price">Rs {startingPrice}</span>
            </div>
                <CardBtn btnTitle={"Apply Now"} backgroundColor={"#38C675"} />

        </div>
    );
};
export default SimpleProfileCard;
