import AppliedForm from "@components/AppliedTask/AppliedForm";
import Image from "next/image";
import { useState } from "react";
import { BookingDetails } from "staticData/bookNowModalCard";
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
            <BookNowButton
                btnTitle={"Apply Now"}
                backgroundColor={"#38C675"}
                showModal={true}
                handleOnClick={() => setShowModal(!showModal)}
            />
            {BookingDetails &&
                BookingDetails.map((detail) => (
                    <AppliedForm
                        key={detail.id}
                        title={detail.title}
                        price={detail.price}
                        image={detail.image}
                        description={detail.description}
                        problemDescription={detail.problemDescription}
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                    />
                ))}
        </div>
    );
};
export default SimpleProfileCard;
