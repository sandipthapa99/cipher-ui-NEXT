import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/pro-solid-svg-icons'

import Image from "next/image";
import { faHeart, faShare } from "@fortawesome/pro-regular-svg-icons";
import { ServiceCardProps } from "types/serviceCard";
import CardBtn from "./CardBtn";

const ServiceCard = ({
    serviceImage,
    serviceTitle,
    serviceProvider,
    serviceProviderLocation,
    serviceDescription,
    serviceRating,
    servicePrice,
}:ServiceCardProps) => {
    return(
        <div className="service-card-block">
            <figure className="thumbnail-img">
                <Image
                    src={serviceImage}
                    layout="fill"
                    objectFit="cover"
                    alt="servicecard-image"
                />
            </figure>
            <div className="card-content">
                <h2 className="card-title">{serviceTitle}</h2>
                <h3 className="card-subtitle"><span>{serviceProvider}</span> | {serviceProviderLocation}</h3>
                <p className="card-description">
                {`${serviceDescription.substring(0, 80)}...`} 
                </p>
                <div className="ratings-wrapper d-flex justify-content-between">
                    <p className='ratings d-flex align-items-center justify-content-center'>
                        <FontAwesomeIcon icon={faStar} className="svg-icon star"/>
                        {serviceRating}
                    </p>
                    <p className='price'>${servicePrice}/hr</p>
                </div>
                <div className="booking-wrapper d-flex justify-content-between">
                    <div className='d-flex'>
                        <FontAwesomeIcon icon={faHeart} className="svg-icon heart"/>
                        <FontAwesomeIcon icon={faShare} className="svg-icon share"/>
                    </div>
                    <CardBtn btnTitle="Book Now"/>                    
                </div>
            </div>
        </div>
    )
}
export default ServiceCard;
