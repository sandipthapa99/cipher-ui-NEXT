import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/pro-solid-svg-icons'

import Image from "next/image";
import { faHeart, faShare } from "@fortawesome/pro-regular-svg-icons";
import { ServiceCardProps } from "types/serviceCard";
import CardBtn from "./CardBtn";
import { MerchantCardProps } from "types/merchantCard";

const MerchantCard = ({
    merchantImage,
    merchantName,
    merchantCategory,
    merchantLocation,
    merchantDescription,
    merchantRating,
    merchantPrice,
}:MerchantCardProps) => {
    return(
        <div className="merchant-card-block">
            <figure className="thumbnail-img">
                <Image
                    src={merchantImage}
                    layout="fill"
                    objectFit="cover"
                    alt="merchant-image"
                />
            </figure>
            <div className="card-content">
                <div className="merchant-description">
                    <h2 className="card-title">{merchantName}</h2>
                    <h3 className="card-subtitle"><span>{merchantCategory}</span> | {merchantLocation}</h3>
                    <p className="card-description">
                    {`${merchantDescription.substring(0, 80)}...`} 
                    </p>
                </div>

                <div className="ratings-wrapper d-flex justify-content-between">
                    <p className='ratings d-flex align-items-center justify-content-center'>
                        <FontAwesomeIcon icon={faStar} className="svg-icon star"/>
                        {merchantRating}
                    </p>
                    <p className='price'>${merchantPrice}/hr</p>
                </div>
                <div className="booking-wrapper d-flex justify-content-between">
                    <div className='d-flex'>
                        <FontAwesomeIcon icon={faHeart} className="svg-icon heart"/>
                        <FontAwesomeIcon icon={faShare} className="svg-icon share"/>
                    </div>
                    <CardBtn btnTitle="Hire Me"/>                    
                </div>
            </div>
        </div>
    )
}
export default MerchantCard;
