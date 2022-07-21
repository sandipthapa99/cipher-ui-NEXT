import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/pro-solid-svg-icons'

import Image from 'next/image'
import { faHeart, faShare } from '@fortawesome/pro-regular-svg-icons'
import { ServiceCardProps } from 'types/serviceCard'
import CardBtn from './CardBtn'
import { MerchantCardProps } from 'types/merchantCard'

const MerchantCard = ({
  merchantImage,
  merchantName,
  merchantCategory,
  merchantLocation,
  merchantDescription,
  merchantRating,
  merchantPrice,
  happyClients,
  successRate,
}: MerchantCardProps) => {
  return (
    <div className="merchant-card-block">
      <div className="merchant-intro">
        <figure className="thumbnail-img">
          <Image
            src={merchantImage}
            layout="fill"
            objectFit="cover"
            alt="merchant-image"
          />
        </figure>
        <div className="merchant-name">
          <h2 className="card-title">{`${
            merchantName.length > 17
              ? `${merchantName.substring(0, 17)}...`
              : merchantName
          }`}</h2>
          <h3 className="card-subtitle">
            <span>{merchantCategory}</span> | {merchantLocation}
          </h3>
        </div>
      </div>
      <div className="card-content">
        <div className="merchant-description">
          <p className="card-description">
            {`${
              merchantDescription.length > 100
                ? `${merchantDescription.substring(0, 100)}...`
                : merchantDescription
            }`}
          </p>
        </div>
        <div className="analytics d-flex justify-content-between">
          <div className="happy-clients d-flex flex-column">
            <div className="count d-flex flex-row">
              <figure className="thumbnail-img">
                <Image
                  src="/icons/happy-face.svg"
                  layout="fill"
                  objectFit="contain"
                  alt="Happy Face"
                />
              </figure>
              <p>{happyClients}</p>
            </div>
            <div className="analytics-title">
              <p>Happy Clients</p>
            </div>
          </div>
          <div className="success-rate d-flex flex-column">
            <div className="count  d-flex flex-row">
              <figure className="thumbnail-img">
                <Image
                  src="/icons/badge.svg"
                  layout="fill"
                  objectFit="contain"
                  alt="Happy Face"
                />
              </figure>
              <p>{successRate}%</p>
            </div>
            <div className="analytics-title">
              <p>Success Rate</p>
            </div>
          </div>
        </div>
        <div className="ratings-wrapper d-flex justify-content-between">
          <p className="ratings d-flex align-items-center justify-content-center">
            <FontAwesomeIcon icon={faStar} className="svg-icon star" />
            {merchantRating}
          </p>
          <p className="price">${merchantPrice}/hr</p>
        </div>
        <div className="booking-wrapper d-flex justify-content-between">
          <div className="d-flex">
            <FontAwesomeIcon icon={faHeart} className="svg-icon heart" />
            <FontAwesomeIcon icon={faShare} className="svg-icon share" />
          </div>
          <CardBtn btnTitle="Hire Me" backgroundColor="#211D4F" />
        </div>
      </div>
    </div>
  )
}
export default MerchantCard
